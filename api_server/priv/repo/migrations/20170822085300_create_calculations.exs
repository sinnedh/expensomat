defmodule ApiServer.Repo.Migrations.CreateCalculations do
  use Ecto.Migration

  def change do
    create table(:calculations) do
      add :name, :string
      add :description, :text

      timestamps()
    end

  end
end
