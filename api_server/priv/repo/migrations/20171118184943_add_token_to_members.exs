defmodule ApiServer.Repo.Migrations.AddTokenToMembers do
  use Ecto.Migration

  def change do
    alter table(:members) do
      add :token, :string
    end
    create unique_index(:members, [:token])
  end
end
