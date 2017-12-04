defmodule ApiServer.Repo.Migrations.AddDeletedAt do
  use Ecto.Migration

  def change do
    alter table(:expenses) do
      add :deleted_at, :utc_datetime, default: nil
    end
    alter table(:calculations) do
      add :deleted_at, :utc_datetime, default: nil
    end
  end
end
