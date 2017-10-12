defmodule ApiServer.Calculations.Calculation do
  use Ecto.Schema
  import Ecto.Changeset
  alias ApiServer.Calculations.Calculation


  schema "calculations" do
    field :description, :string
    field :name, :string
    has_many :members, ApiServer.Calculations.Member

    timestamps()
  end

  @doc false
  def changeset(%Calculation{} = calculation, attrs) do
    calculation
    |> cast(attrs, [:name, :description])
    |> validate_required([:name])
  end
end
