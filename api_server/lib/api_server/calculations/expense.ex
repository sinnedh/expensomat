defmodule ApiServer.Calculations.Expense do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias ApiServer.Calculations.{Expense, Member}
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

  def deleted(query) do
    query |> where([e], not is_nil(e.deleted_at))
  end

  def undeleted(query) do
    query |> where([e], is_nil(e.deleted_at))
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
    |> validate_required([:calculation_id, :description, :amount, :paid_at])
    |> put_paid_for(attrs)
    |> put_paid_by(attrs)
  end

  defp put_paid_for(changeset, %{"paid_for" => paid_for}) do
    members = Repo.all(from m in Member, where: m.id in ^paid_for)
    changeset |> put_assoc(:paid_for, members)
  end
  defp put_paid_for(changeset, _), do: changeset

  defp put_paid_by(changeset, %{"paid_by" => paid_by}) do
    members = Repo.all(from m in Member, where: m.id in ^paid_by)
    changeset |> put_assoc(:paid_by, members)
  end
  defp put_paid_by(changeset, _), do: changeset

end
