defmodule ApiServerWeb.MemberControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.Calculations

  @valid_attrs %{"name" => "Schlucke"}
  @update_attrs %{"name" => "Martin"}
  @invalid_attrs %{"name" => 22}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  defp create_calculation(conn), do: create_calculation(conn, %{name: "A calculation"})
  defp create_calculation(_, attrs) do
    {:ok, calculation} = Calculations.create_calculation(attrs)
    {:ok, calculation: calculation}
  end

  defp create_member(calculation) do
    create_member(calculation, %{name: "Kalle", token: "ABCD"})
  end
  defp create_member(calculation, %{name: name, token: token}) do
    {:ok, member} = Calculations.create_member(
      calculation,
      %{"name" => name, "token" => token}
    )
    {:ok, member: member}
  end

  describe "index" do
    setup [:create_calculation]

    test "list all members of calculation for all members", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)
      {:ok, member: member2} = create_member(calculation, %{name: "Keek", token: "EFGH"})

      expected_response = [
        %{"id" => member1.id, "name" => "Kalle"},
        %{"id" => member2.id, "name" => "Keek"},
      ]

      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, member1.token))
      |> json_response(200)
      |> Map.fetch!("data")

      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, member2.token))
      |> json_response(200)
      |> Map.fetch!("data")
    end

    test "does not list members of other calculations", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)
      {:ok, member: member2} = create_member(calculation, %{name: "Keek", token: "EFGH"})

      {:ok, calculation: other_calculation} = create_calculation(%{name: "Other calculation"})
      {:ok, member: other_member} = create_member(other_calculation, %{name: "Franky", token: "IJKL"})

      expected_response = [
        %{"id" => member1.id, "name" => "Kalle"},
        %{"id" => member2.id, "name" => "Keek"},
      ]
      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, member1.token))
      |> json_response(200)
      |> Map.fetch!("data")

      expected_response = [%{"id" => other_member.id, "name" => "Franky"}]
      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, other_member.token))
      |> json_response(200)
      |> Map.fetch!("data")
    end

    # TODO: test "list token of members when admin"
    # TODO: test "does not show token of members when not admin"
  end

  describe "create member" do
    setup [:create_calculation]

    test "renders new member when data is valid", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)

      assert %{"id" => _, "name" => "Schlucke"} = conn
      |> post(calculation_member_path(conn, :create, member1.token), member: @valid_attrs)
      |> json_response(201)
      |> Map.fetch!("data")

      assert length(Calculations.get_calculation!(calculation.id).members) == 2
    end

    test "renders errors when data is invalid", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)

      assert %{} != conn
      |> post(calculation_member_path(conn, :create, member1.token), member: @invalid_attrs)
      |> json_response(422)
      |> Map.fetch!("errors")

      assert length(Calculations.get_calculation!(calculation.id).members) == 1
    end

    test "creates a new token for this member", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)

      assert %{"id" => id, "name" => "Schlucke"} = conn
      |> post(calculation_member_path(conn, :create, member1.token), member: @valid_attrs)
      |> json_response(201)
      |> Map.fetch!("data")

      assert String.length(Calculations.get_member!(id).token) == 24
    end

    test "ignores a possible token in request", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)

      attrs = @valid_attrs |> Map.put("token", "ABCD1234")
      assert %{"id" => id, "name" => "Schlucke"} = conn
      |> post(calculation_member_path(conn, :create, member1.token), member: attrs)
      |> json_response(201)
      |> Map.fetch!("data")

      assert Calculations.get_member!(id).token != "ABCD1234"
      assert String.length(Calculations.get_member!(member1.id).token) == 24
    end

    # TODO:
    #test "creates member only when token is valid", %{conn: conn, calculation: calculation} do
    #  invalid_token = "INVALID"
    #  conn
    #  |> post(calculation_member_path(conn, :create, invalid_token), member: @valid_attrs)
    #  |> json_response(404)
    #
    #  assert length(Calculations.get_calculation!(calculation.id).members) == 0
    #end
    #
    # TODO: test "creates member only when admin token is given"
  end

  describe "update member" do
    setup [:create_calculation]

    test "renders new member when data is valid", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)

      assert %{"id" => member1.id, "name" => "Martin"} == conn
      |> put(calculation_member_path(conn, :update, member1.token, member1), member: @update_attrs)
      |> json_response(200)
      |> Map.fetch!("data")

      assert Calculations.get_member!(member1.id).name == "Martin"
    end

    test "renders errors when data is invalid", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)

      assert %{} != conn
      |> put(calculation_member_path(conn, :update, member1.token, member1), member: @invalid_attrs)
      |> json_response(422)
      |> Map.fetch!("errors")

      assert Calculations.get_member!(member1.id).name == "Kalle"
      assert length(Calculations.get_calculation!(calculation.id).members) == 1
    end

    test "ignores a possible token in request", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)

      update_attrs = @update_attrs |> Map.put("token", "XYZ999")
      conn
      |> put(calculation_member_path(conn, :update, member1.token, member1), member: update_attrs)
      |> json_response(200)

      assert Calculations.get_member!(member1.id).token != "XYZ999"
      assert String.length(Calculations.get_member!(member1.id).token) == 24
    end

    # TODO: test "updates member only when token is valid"
    # TODO: test "updates member only when admin token is given"
  end

  describe "delete member" do
    setup [:create_calculation]

    test "deletes chosen member", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)
      {:ok, member: member2} = create_member(calculation, %{name: "Keek", token: "EFGH"})

      assert "" == conn
      |> delete(calculation_member_path(conn, :delete, member1.token, member2))
      |> response(204)

      assert_raise Ecto.NoResultsError, fn ->
        Calculations.get_member!(member2.id)
      end
    end

    # TODO test "member cannot delete himself"
    # TODO test "deletes member only when token is valid"
    # TODO test "deletes member only when admin token is given"
  end


  #  alias ApiServer.Calculations.Member
  #
  #  @create_attrs %{name: "some name"}
  #  @update_attrs %{name: "some updated name"}
  #  @invalid_attrs %{name: nil}


  # defp create_calculation_with_two_members(_) do
  #   {:ok, calculation: calculation} = create_calculation()
  #   {:ok, member: member1} = create_member(calculation)
  #   {:ok, member: member2} = create_member(calculation, %{name: "Keek", token: "EFGH"})
  #   {:ok, calculation: calculation, member1: member1, member2: member2}
  # end


  #describe "index" do
  # test "lists all members from the same calculation", %{conn: conn, calculation: calculation} do
  #    {:ok, other_calculation} = Calculations.create_calculation(%{name: "Another calculation"})
  #    {:ok, member1} = fixture(calculation, :member)
  #    {:ok, member2} = fixture(calculation, :member)
  #    {:ok, member2} = fixture(other_calculation, :member)
  #    conn = get conn, calculation_member_path(conn, :index, member1.token)
  #    assert length(json_response(conn, 200)["data"]) == 2
  #    conn = get conn, calculation_member_path(conn, :index, member2.token)
  #    assert length(json_response(conn, 200)["data"]) == 2
  #    conn = get conn, calculation_member_path(conn, :index, other_member.token)
  #    assert length(json_response(conn, 200)["data"]) == 1
  #  end
  #end

#  describe "create member" do
#    test "renders member when data is valid", %{conn: conn} do
#      conn = post conn, member_path(conn, :create), member: @create_attrs
#      assert %{"id" => id} = json_response(conn, 201)["data"]
#
#      conn = get conn, member_path(conn, :show, id)
#      assert json_response(conn, 200)["data"] == %{
#        "id" => id,
#        "name" => "some name"}
#    end
#
#    test "renders errors when data is invalid", %{conn: conn} do
#      conn = post conn, member_path(conn, :create), member: @invalid_attrs
#      assert json_response(conn, 422)["errors"] != %{}
#    end
#  end

#  describe "update member" do
#    setup [:create_member]
#
#    test "renders member when data is valid", %{conn: conn, member: %Member{id: id} = member} do
#      conn = put conn, member_path(conn, :update, member), member: @update_attrs
#      assert %{"id" => ^id} = json_response(conn, 200)["data"]
#
#      conn = get conn, member_path(conn, :show, id)
#      assert json_response(conn, 200)["data"] == %{
#        "id" => id,
#        "name" => "some updated name"}
#    end
#
#    test "renders errors when data is invalid", %{conn: conn, member: member} do
#      conn = put conn, member_path(conn, :update, member), member: @invalid_attrs
#      assert json_response(conn, 422)["errors"] != %{}
#    end
#  end

#  describe "delete member" do
#    setup [:create_member]
#
#    test "deletes chosen member", %{conn: conn, member: member} do
#      conn = delete conn, member_path(conn, :delete, member)
#      assert response(conn, 204)
#      assert_error_sent 404, fn ->
#        get conn, member_path(conn, :show, member)
#      end
#    end
#  end
#
#  defp create_member(_) do
#    member = fixture(:member)
#    {:ok, member: member}
#  end
end
