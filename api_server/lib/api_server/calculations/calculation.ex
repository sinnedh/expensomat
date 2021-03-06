defmodule ApiServer.Calculations.Calculation do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias ApiServer.Calculations.Calculation


  schema "calculations" do
    field :description, :string
    field :name, :string
    has_many :members, ApiServer.Calculations.Member
    field :deleted_at, :utc_datetime

    timestamps()
  end

  def deleted(query) do
    query |> where([c], not is_nil(c.deleted_at))
  end

  def undeleted(query) do
    query |> where([c], is_nil(c.deleted_at))
  end

  def delete_changeset(%Calculation{} = calculation) do
    current_time = DateTime.utc_now
    calculation
    |> cast(%{deleted_at: current_time}, [:deleted_at])
    |> validate_required([:deleted_at])
  end

  @doc false
  def changeset(%Calculation{} = calculation, attrs) do
    calculation
    |> cast(attrs, [:name, :description, :deleted_at])
    |> validate_required([:name])
    |> cast_assoc(:members)
  end
end
