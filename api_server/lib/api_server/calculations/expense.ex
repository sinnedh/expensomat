defmodule ApiServer.Calculations.Expense do
  use Ecto.Schema
  import Ecto.Changeset
  alias ApiServer.Calculations.Expense


  schema "expenses" do
    field :amount, :integer
    field :description, :string
    field :calculation_id, :id

    timestamps()
  end

  @doc false
  def changeset(%Expense{} = expense, attrs) do
    expense
    |> cast(attrs, [:description, :amount, :calculation_id])
    |> validate_required([:description, :amount, :calculation_id])
  end
end
