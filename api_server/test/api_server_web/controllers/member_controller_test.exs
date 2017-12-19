defmodule ApiServerWeb.MemberControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.Calculations

  @valid_attrs %{"name" => "Schlucke"}
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
  end

  describe "create member" do
    test "creates member only when token is valid"
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
  end

  describe "update member" do
    test "renders member when data is valid"
    test "renders errors when data is invalid"
    test "ignores a possible token in request"
    test "updates member only when token is valid"
  end

  describe "delete member" do
    test "deletes chosen member"
    test "deletes member only when token is valid"
  end
end
