defmodule ApiServer.Repo.Migrations.CreateMembers do
  use Ecto.Migration

  def change do
    create table(:members) do
      add :name, :string
      add :calculation_id, references(:calculations, on_delete: :nothing)

      timestamps()
    end

  end
end
