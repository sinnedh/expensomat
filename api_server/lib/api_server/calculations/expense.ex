defmodule ApiServer.Calculations.Expense do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias ApiServer.Calculations.Expense
  alias ApiServer.Repo


  schema "expenses" do
    field :amount, :integer
    field :description, :string
    field :calculation_id, :id
    field :paid_at, :utc_datetime
    many_to_many :paid_by, ApiServer.Calculations.Member, join_through: "expense_paid_by_members"
    many_to_many :paid_for, ApiServer.Calculations.Member, join_through: "expense_paid_for_members"
    field :deleted_at, :utc_datetime

    timestamps()
  end

  def delete_changeset(%Expense{} = calculation) do
    current_time = DateTime.utc_now
    calculation
    |> cast(%{deleted_at: current_time}, [:deleted_at])
    |> validate_required([:deleted_at])
  end

  @doc false
  def changeset(%Expense{} = expense, attrs) do
    expense
    |> Repo.preload([:paid_by, :paid_for])
    |> cast(attrs, [:calculation_id, :description, :amount, :paid_at, :deleted_at])
    |> validate_required([:calculation_id, :description, :amount, :paid_at, :paid_by, :paid_for])
    |> put_assoc(:paid_for, get_paid_for(attrs))
    |> put_assoc(:paid_by, get_paid_by(attrs))
  end

  defp get_paid_for(%{"paid_for" => paid_for}) do
    Repo.all(from m in ApiServer.Calculations.Member, where: m.id in ^paid_for)
  end

  defp get_paid_for(_) do
    []
  end

  defp get_paid_by(%{"paid_by" => paid_by}) do
    Repo.all(from m in ApiServer.Calculations.Member, where: m.id in ^paid_by)
  end

  defp get_paid_by(_) do
    []
  end

end
