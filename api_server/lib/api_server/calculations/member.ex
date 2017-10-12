defmodule ApiServer.Calculations.Member do
  use Ecto.Schema
  import Ecto.Changeset
  alias ApiServer.Calculations.Member


  schema "members" do
    field :name, :string
    field :calculation_id, :id

    timestamps()
  end

  @doc false
  def changeset(%Member{} = member, attrs) do
    member
    |> cast(attrs, [:name, :calculation_id])
    |> validate_required([:name, :calculation_id])
  end
end
