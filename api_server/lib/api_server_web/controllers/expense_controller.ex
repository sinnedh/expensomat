defmodule ApiServerWeb.ExpenseController do
  use ApiServerWeb, :controller

  alias ApiServer.Calculations
  alias ApiServer.Calculations.Expense

  action_fallback ApiServerWeb.FallbackController

  def index(conn, %{"calculation_token" => calculation_token}) do
    with {:ok, auth_member} <- Calculations.verify_token_with_role(calculation_token, ["observer", "editor", "admin"]),
         expenses = Calculations.list_expenses(auth_member.calculation_id),
      do: render(conn, "index.json", expenses: expenses)
  end

  def create(conn, %{"calculation_token" => calculation_token, "expense" => expense_params}) do
    with {:ok, auth_member} <- Calculations.verify_token_with_role(calculation_token, ["editor", "admin"]),
         calculation = Calculations.get_calculation!(auth_member.calculation_id),
         {:ok, %Expense{} = expense} <- Calculations.create_expense(calculation, expense_params),
      do: conn
      |> put_status(:created)
      |> put_resp_header("location", calculation_expense_path(conn, :show, calculation, expense))
      |> render("show.json", expense: expense)
  end

  def show(conn, %{"calculation_token" => calculation_token, "id" => id}) do
    with {:ok, auth_member} <- Calculations.verify_token_with_role(calculation_token, ["observer", "editor", "admin"]),
         expense = Calculations.get_expense!(id),
      do: render(conn, "show.json", expense: expense)
  end

  def update(conn, %{"calculation_token" => calculation_token, "id" => id, "expense" => expense_params}) do
    with {:ok, _auth_member} <- Calculations.verify_token_with_role(calculation_token, ["editor", "admin"]),
         expense = Calculations.get_expense!(id),
         {:ok, %Expense{} = expense} <- Calculations.update_expense(expense, expense_params),
      do: render(conn, "show.json", expense: expense)
  end

  def delete(conn, %{"calculation_token" => calculation_token, "id" => id}) do
    with {:ok, _auth_member} <- Calculations.verify_token_with_role(calculation_token, ["editor", "admin"]),
         expense = Calculations.get_expense!(id),
         {:ok, %Expense{}} <- Calculations.delete_expense(expense),
      do: send_resp(conn, :no_content, "")
  end
end
