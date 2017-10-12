defmodule ApiServerWeb.ExpenseController do
  use ApiServerWeb, :controller

  alias ApiServer.Calculations
  alias ApiServer.Calculations.Expense

  action_fallback ApiServerWeb.FallbackController

  def index(conn, %{"calculation_id" => calculation_id}) do
    expenses = Calculations.list_expenses(calculation_id)
    render(conn, "index.json", expenses: expenses)
  end

  def create(conn, %{"expense" => expense_params}) do
    with {:ok, %Expense{} = expense} <- Calculations.create_expense(expense_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", expense_path(conn, :show, expense))
      |> render("show.json", expense: expense |> ApiServer.Repo.preload([:paid_by, :paid_for]))
    end
  end

  def show(conn, %{"id" => id}) do
    expense = Calculations.get_expense!(id)
    render(conn, "show.json", expense: expense)
  end

  def update(conn, %{"id" => id, "expense" => expense_params}) do
    expense = Calculations.get_expense!(id)

    with {:ok, %Expense{} = expense} <- Calculations.update_expense(expense, expense_params) do
      render(conn, "show.json", expense: expense |> ApiServer.Repo.preload([:paid_by, :paid_for]))
    end
  end

  def delete(conn, %{"id" => id}) do
    expense = Calculations.get_expense!(id)
    with {:ok, %Expense{}} <- Calculations.delete_expense(expense) do
      send_resp(conn, :no_content, "")
    end
  end
end
