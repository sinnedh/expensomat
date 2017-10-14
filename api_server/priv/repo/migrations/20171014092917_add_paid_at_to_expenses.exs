defmodule ApiServer.Repo.Migrations.AddPaidAtToExpense do
  use Ecto.Migration

  def change do
    alter table(:expenses) do
      add :paid_at, :utc_datetime
    end
  end
end
