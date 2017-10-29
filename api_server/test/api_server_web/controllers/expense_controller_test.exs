defmodule ApiServerWeb.ExpenseControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.Calculations

  @create_attrs %{"amount" => 42, "description" => "some description", "paid_by" => [], "paid_for" => [], "paid_at" => "2010-04-17 14:00:00.000000Z"}
  @update_attrs %{"amount" => 43, "description" => "some updated description", "paid_at" => "2011-05-18 15:01:01.000000Z"}
  @invalid_attrs %{"amount" => nil, "description" => nil}

  setup %{conn: conn} do
    {:ok, calculation} = Calculations.create_calculation(%{name: "Main calculation"})
    {
      :ok,
      conn: put_req_header(conn, "accept", "application/json"),
      calculation: calculation,
    }
  end

  def fixture(calculation, :expense) do
    {:ok, expense} = Calculations.create_expense(calculation, @create_attrs)
    expense
  end

  describe "index" do

    test "lists all expenses for a given calculation", %{conn: conn, calculation: calculation} do
      {:ok, other_calculation} = Calculations.create_calculation(%{name: "Another calculation"})
      fixture(calculation, :expense)
      fixture(calculation, :expense)
      fixture(other_calculation, :expense)

      conn = get conn, calculation_expense_path(conn, :index, calculation)
      assert length(json_response(conn, 200)["data"]) == 2
    end

    test "list no expenses from other calculations", %{conn: conn, calculation: calculation} do
      {:ok, other_calculation} = Calculations.create_calculation(%{name: "Another calculation"})
      fixture(other_calculation, :expense)
      fixture(other_calculation, :expense)

      conn = get conn, calculation_expense_path(conn, :index, calculation)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create expense" do
    test "renders expense when data is valid", %{conn: conn, calculation: calculation} do
      conn = post conn, calculation_expense_path(conn, :create, calculation.id), expense: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, calculation_expense_path(conn, :show, calculation, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 42,
        "description" => "some description",
        "paid_by" => [],
        "paid_for" => [],
        "paid_at" => "2010-04-17T14:00:00Z",
      }
    end

    test "renders errors when data is invalid", %{conn: conn, calculation: calculation} do
      # invalid_attrs = @invalid_attrs |> Map.put("calculation_id", calculation.id)
      conn = post conn, calculation_expense_path(conn, :create, calculation), expense: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update expense" do
    test "renders expense when data is valid", %{conn: conn, calculation: calculation} do
      expense = fixture(calculation, :expense)
      id = expense.id
      conn = put conn, calculation_expense_path(conn, :update, calculation, expense), expense: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, calculation_expense_path(conn, :show, calculation, expense)
      assert json_response(conn, 200)["data"] == %{
        "id" => expense.id,
        "amount" => 43,
        "description" => "some updated description",
        "paid_by" => [],
        "paid_for" => [],
        "paid_at" => "2011-05-18T15:01:01Z",
      }
    end

    test "renders errors when data is invalid", %{conn: conn, calculation: calculation} do
      expense = fixture(calculation, :expense)
      conn = put conn, calculation_expense_path(conn, :update, calculation, expense), expense: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete expense" do
    test "deletes chosen expense", %{conn: conn, calculation: calculation} do
      expense = fixture(calculation, :expense)
      conn = delete conn, calculation_expense_path(conn, :delete, calculation, expense)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, calculation_expense_path(conn, :show, calculation, expense)
      end
    end
  end
end
