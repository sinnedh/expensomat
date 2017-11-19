defmodule ApiServerWeb.CalculationControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.Calculations

  @create_attrs %{description: "some description", name: "some name"}
  @update_attrs %{description: "some updated description", name: "some updated name"}
  @invalid_attrs %{description: nil, name: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all calculations", %{conn: conn} do
      conn = get conn, calculation_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create calculation" do
    test "renders calculation when data is valid", %{conn: conn} do
      conn = post conn, calculation_path(conn, :create), calculation: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      {:ok, member} = Calculations.create_member(%{calculation_id: id, name: "A member", token: "ABCD"})

      conn = get conn, calculation_path(conn, :show, member.token)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "description" => "some description",
        "name" => "some name",
        "members" => [%{"name" => "A member", "id" => member.id}],
        "matrix" => %{}
      }
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, calculation_path(conn, :create), calculation: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update calculation" do
    setup [:create_calculation_and_member]

    test "renders calculation when data is valid", %{conn: conn, member: member} do
      id = member.calculation_id
      conn = put conn, calculation_path(conn, :update, member.token), calculation: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, calculation_path(conn, :show, member.token)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "description" => "some updated description",
        "name" => "some updated name",
        "members" => [%{"name" => "A member", "id" => member.id}],
        "matrix" => %{}
      }
    end

    test "renders errors when data is invalid", %{conn: conn, member: member} do
      conn = put conn, calculation_path(conn, :update, member.token), calculation: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete calculation" do
    setup [:create_calculation_and_member]

    test "deletes chosen calculation", %{conn: conn, member: member} do
      conn = delete conn, calculation_path(conn, :delete, member.token)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, calculation_path(conn, :show, member.token)
      end
    end
  end

  defp create_calculation_and_member(_) do
    {:ok, calculation} = Calculations.create_calculation(@create_attrs)
    {:ok, member} = Calculations.create_member(%{calculation_id: calculation.id, name: "A member", token: "ABCD"})
    {:ok, member: member}
  end
end
