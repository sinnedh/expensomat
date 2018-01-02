defmodule ApiServer.Repo.Migrations.AddRoleToMembers do
  use Ecto.Migration

  def change do
    # creating the database type
    execute("create type member_role as enum ('admin', 'editor', 'observer')")

    alter table(:members) do
      add :role, :member_role, null: false, default: "editor"
    end
  end
end
