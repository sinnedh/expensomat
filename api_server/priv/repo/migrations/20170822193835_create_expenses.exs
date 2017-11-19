defmodule ApiServer.Repo.Migrations.CreateExpenses do
  use Ecto.Migration

  def change do
    create table(:expenses) do
      add :description, :text
      add :amount, :integer
      add :calculation_id, references(:calculations, on_delete: :delete_all)

      timestamps()
    end

    create index(:expenses, [:calculation_id])
  end
end
