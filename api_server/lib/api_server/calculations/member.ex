defmodule ApiServer.Calculations.Member do
  use Ecto.Schema
  import Ecto.Changeset
  alias ApiServer.Calculations.Member


  schema "members" do
    field :token, :string  # TODO: at least hash this token when being stored (e.g. using comeonin/bcrypt)
    field :name, :string
    field :calculation_id, :id

    timestamps()
  end

  @doc false
  def changeset(%Member{} = member, attrs) do
    member
    |> cast(attrs, [:name, :calculation_id, :token])
    |> validate_required([:name, :calculation_id, :token])
    |> unique_constraint(:token)
  end
end
