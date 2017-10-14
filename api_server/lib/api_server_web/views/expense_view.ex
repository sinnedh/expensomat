defmodule ApiServerWeb.ExpenseView do
  use ApiServerWeb, :view
  alias ApiServerWeb.ExpenseView

  def render("index.json", %{expenses: expenses}) do
    %{data: render_many(expenses, ExpenseView, "expense.json")}
  end

  def render("show.json", %{expense: expense}) do
    %{data: render_one(expense, ExpenseView, "expense.json")}
  end

  def render("expense.json", %{expense: expense}) do
    %{id: expense.id,
      description: expense.description,
      amount: expense.amount,
      # TODO: set the microsecond precision to 0 at a more central place than here:
      paid_at: DateTime.to_iso8601(%{expense.paid_at | microsecond: {0, 0}}),
      paid_by: render_many(expense.paid_by, ApiServerWeb.MemberView, "member.json"),
      paid_for: render_many(expense.paid_for, ApiServerWeb.MemberView, "member.json")
    }
  end
end
