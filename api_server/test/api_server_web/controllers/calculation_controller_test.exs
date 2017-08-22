defmodule ApiServerWeb.CalculationControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.Calculations
  alias ApiServer.Calculations.Calculation

  @create_attrs %{description: "some description", name: "some name"}
  @update_attrs %{description: "some updated description", name: "some updated name"}
  @invalid_attrs %{description: nil, name: nil}

  def fixture(:calculation) do
    {:ok, calculation} = Calculations.create_calculation(@create_attrs)
    calculation
  end

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

      conn = get conn, calculation_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "description" => "some description",
        "name" => "some name"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, calculation_path(conn, :create), calculation: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update calculation" do
    setup [:create_calculation]

    test "renders calculation when data is valid", %{conn: conn, calculation: %Calculation{id: id} = calculation} do
      conn = put conn, calculation_path(conn, :update, calculation), calculation: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, calculation_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "description" => "some updated description",
        "name" => "some updated name"}
    end

    test "renders errors when data is invalid", %{conn: conn, calculation: calculation} do
      conn = put conn, calculation_path(conn, :update, calculation), calculation: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete calculation" do
    setup [:create_calculation]

    test "deletes chosen calculation", %{conn: conn, calculation: calculation} do
      conn = delete conn, calculation_path(conn, :delete, calculation)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, calculation_path(conn, :show, calculation)
      end
    end
  end

  defp create_calculation(_) do
    calculation = fixture(:calculation)
    {:ok, calculation: calculation}
  end
end
