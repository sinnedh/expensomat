defmodule ApiServerWeb.MemberControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.Calculations

  @valid_attrs %{"name" => "Schlucke", "role" => "admin"}
  @update_attrs %{"name" => "Martin", "role" => "editor"}
  @invalid_attrs %{"name" => 22, "role" => "invalid"}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  defp create_calculation(conn), do: create_calculation(conn, %{name: "A calculation"})
  defp create_calculation(_, attrs) do
    {:ok, calculation} = Calculations.create_calculation(attrs)
    {:ok, calculation: calculation}
  end

  defp create_member(calculation) do
    create_member(calculation, %{name: "Kalle", token: "ABCD", role: "admin"})
  end
  defp create_member(calculation, %{name: name, token: token, role: role}) do
    {:ok, member} = Calculations.create_member(
      calculation,
      %{"name" => name, "token" => token, "role" => role}
    )
    {:ok, member: member}
  end

  describe "index" do
    setup [:create_calculation]

    test "list all members of calculation for all members", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)
      {:ok, member: member2} = create_member(calculation, %{name: "Keek", token: "EFGH", role: "editor"})

      expected_response = [
        %{"id" => member1.id, "name" => "Kalle", "role" => "admin"},
        %{"id" => member2.id, "name" => "Keek", "role" => "editor"},
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
      {:ok, member: member2} = create_member(calculation, %{name: "Keek", token: "EFGH", role: "editor"})

      {:ok, calculation: other_calculation} = create_calculation(%{name: "Other calculation"})
      {:ok, member: other_member} = create_member(other_calculation, %{name: "Franky", token: "IJKL", role: "editor"})

      expected_response = [
        %{"id" => member1.id, "name" => "Kalle", "role" => "admin"},
        %{"id" => member2.id, "name" => "Keek", "role" => "editor"},
      ]
      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, member1.token))
      |> json_response(200)
      |> Map.fetch!("data")

      expected_response = [%{"id" => other_member.id, "name" => "Franky", "role" => "editor"}]
      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, other_member.token))
      |> json_response(200)
      |> Map.fetch!("data")
    end

    test "forbidden when no valid token", %{conn: conn} do
      assert "Forbidden" == conn
      |> get(calculation_member_path(conn, :index, "NVLD_TKN"))
      |> json_response(403)
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
      assert %{"id" => id, "name" => "Schlucke", "role" => "admin"} = conn
      |> post(calculation_member_path(conn, :create, member1.token), member: attrs)
      |> json_response(201)
      |> Map.fetch!("data")

      assert Calculations.get_member!(id).token != "ABCD1234"
      assert String.length(Calculations.get_member!(member1.id).token) == 24
    end

    test "forbidden when no valid token", %{conn: conn} do
      assert "Forbidden" == conn
      |> post(calculation_member_path(conn, :create, "NVLD_TKN"), member: @valid_attrs)
      |> json_response(403)
    end

    test "forbidden when user is observer", %{conn: conn, calculation: calculation} do
      {:ok, member: observer} = create_member(calculation, %{name: "Observer", token: "ABCD", role: "observer"})
      assert "Forbidden" == conn
      |> post(calculation_member_path(conn, :create, observer.token), member: @valid_attrs)
      |> json_response(403)
    end

    test "forbidden when user is editor", %{conn: conn, calculation: calculation} do
      {:ok, member: editor} = create_member(calculation, %{name: "Editor", token: "ABCD", role: "editor"})
      assert "Forbidden" == conn
      |> post(calculation_member_path(conn, :create, editor.token), member: @valid_attrs)
      |> json_response(403)
    end

    test "allowed when user is admin", %{conn: conn, calculation: calculation} do
      {:ok, member: admin} = create_member(calculation, %{name: "Admin", token: "ABCD", role: "admin"})
      conn
      |> post(calculation_member_path(conn, :create, admin.token), member: @valid_attrs)
      |> response(201)
    end
  end

  describe "update member" do
    setup [:create_calculation]

    test "renders new member when data is valid", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)

      assert %{"id" => member1.id, "name" => "Martin", "role" => "editor"} == conn
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

    test "forbidden when no valid token", %{conn: conn, calculation: calculation} do
      {:ok, member: member} = create_member(calculation)
      assert "Forbidden" == conn
      |> put(calculation_member_path(conn, :update, "NVLD_TKN", member.id), member: @update_attrs)
      |> json_response(403)
    end

    test "forbidden when user is observer", %{conn: conn, calculation: calculation} do
      {:ok, member: observer} = create_member(calculation, %{name: "Admin", token: "ABCD", role: "observer"})
      {:ok, member: member} = create_member(calculation)
      assert "Forbidden" == conn
      |> put(calculation_member_path(conn, :update, observer.token, member.id), member: @update_attrs)
      |> json_response(403)
    end

    test "forbidden when user is editor", %{conn: conn, calculation: calculation} do
      {:ok, member: editor} = create_member(calculation, %{name: "Admin", token: "ABCD", role: "editor"})
      {:ok, member: member} = create_member(calculation)
      assert "Forbidden" == conn
      |> put(calculation_member_path(conn, :update, editor.token, member.id), member: @update_attrs)
      |> json_response(403)
    end

    test "allowed when user is admin", %{conn: conn, calculation: calculation} do
      {:ok, member: admin} = create_member(calculation, %{name: "Admin", token: "ABCD", role: "admin"})
      {:ok, member: member} = create_member(calculation)
      conn
      |> put(calculation_member_path(conn, :update, admin.token, member.id), member: @update_attrs)
      |> response(200)
    end
  end

  describe "delete member" do
    setup [:create_calculation]

    test "deletes chosen member", %{conn: conn, calculation: calculation} do
      {:ok, member: member2} = create_member(calculation, %{name: "Keek", token: "EFGH", role: "editor"})
      {:ok, member: member1} = create_member(calculation)
      assert "" == conn
      |> delete(calculation_member_path(conn, :delete, member1.token, member2))
      |> response(204)

      assert_raise Ecto.NoResultsError, fn ->
        Calculations.get_member!(member2.id)
      end
    end

    # TODO test "member cannot delete himself"

    test "forbidden when no valid token", %{conn: conn, calculation: calculation} do
      {:ok, member: member} = create_member(calculation)
      assert "Forbidden" == conn
      |> delete(calculation_member_path(conn, :delete, "NVLD_TKN", member))
      |> json_response(403)
    end

    test "forbidden when user is observer", %{conn: conn, calculation: calculation} do
      {:ok, member: observer} = create_member(calculation, %{name: "Admin", token: "ABCD", role: "observer"})
      {:ok, member: member} = create_member(calculation)
      assert "Forbidden" == conn
      |> delete(calculation_member_path(conn, :delete, observer.token, member))
      |> json_response(403)
    end

    test "forbidden when user is editor", %{conn: conn, calculation: calculation} do
      {:ok, member: editor} = create_member(calculation, %{name: "Admin", token: "ABCD", role: "editor"})
      {:ok, member: member} = create_member(calculation)
      assert "Forbidden" == conn
      |> delete(calculation_member_path(conn, :delete, editor.token, member))
      |> json_response(403)
    end

    test "allowed when user is admin", %{conn: conn, calculation: calculation} do
      {:ok, member: admin} = create_member(calculation, %{name: "Admin", token: "ABCD", role: "admin"})
      {:ok, member: member} = create_member(calculation)
      conn
      |> delete(calculation_member_path(conn, :delete, admin.token, member))
      |> response(204)
    end
  end
end
