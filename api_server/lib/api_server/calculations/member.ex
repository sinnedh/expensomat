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
    |> cast(attrs, [:name, :calculation_id])
    |> validate_required([:name])
    |> create_token_if_not_exists
    |> unique_constraint(:token)
  end

  defp create_token_if_not_exists(changeset) do
    token = get_field(changeset, :token)

    cond do
      token == nil -> changeset |> put_change(:token, generate_token())
      true -> changeset
    end
  end

  def generate_token() do
    length = 24
    :crypto.strong_rand_bytes(length)
    |> Base.url_encode64
    |> binary_part(0, length)
  end
end
