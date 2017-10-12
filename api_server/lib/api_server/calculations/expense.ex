defmodule ApiServer.Calculations.Expense do
  use Ecto.Schema
  import Ecto.Changeset
  alias ApiServer.Calculations.Expense


  schema "expenses" do
    field :amount, :integer
    field :description, :string
    field :calculation_id, :id
    many_to_many :paid_by, ApiServer.Calculations.Member, join_through: "expense_paid_by_members"
    many_to_many :paid_for, ApiServer.Calculations.Member, join_through: "expense_paid_for_members"

    timestamps()
  end

  @doc false
  def changeset(%Expense{} = expense, attrs) do
    expense
    |> cast(attrs, [:description, :amount, :calculation_id])
    |> validate_required([:description, :amount, :calculation_id])
  end
end
