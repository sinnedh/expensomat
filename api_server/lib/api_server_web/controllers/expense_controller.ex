defmodule ApiServerWeb.ExpenseController do
  use ApiServerWeb, :controller

  alias ApiServer.Calculations
  alias ApiServer.Calculations.Expense

  action_fallback ApiServerWeb.FallbackController

  def index(conn, %{"calculation_token" => calculation_token}) do
    member = Calculations.get_member_for_token!(calculation_token)
    expenses = Calculations.list_expenses(member.calculation_id)
    render(conn, "index.json", expenses: expenses)
  end

  def create(conn, %{"calculation_token" => calculation_token, "expense" => expense_params}) do
    calculation = Calculations.get_calculation_for_token!(calculation_token)

    with {:ok, %Expense{} = expense} <- Calculations.create_expense(calculation, expense_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", calculation_expense_path(conn, :show, calculation, expense))
      |> render("show.json", expense: expense)
    end
  end

  def show(conn, %{"id" => id}) do
    expense = Calculations.get_expense!(id)
    render(conn, "show.json", expense: expense)
  end

  def update(conn, %{"id" => id, "expense" => expense_params}) do
    expense = Calculations.get_expense!(id)

    with {:ok, %Expense{} = expense} <- Calculations.update_expense(expense, expense_params) do
      render(conn, "show.json", expense: expense)
    end
  end

  def delete(conn, %{"id" => id}) do
    expense = Calculations.get_expense!(id)
    with {:ok, %Expense{}} <- Calculations.delete_expense(expense) do
      send_resp(conn, :no_content, "")
    end
  end
end
