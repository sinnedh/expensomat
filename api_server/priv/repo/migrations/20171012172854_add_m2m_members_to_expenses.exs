defmodule ApiServer.Repo.Migrations.AddM2mMembersToExpenses do
  use Ecto.Migration

  def change do
    create table(:expense_paid_by_members) do
      add :expense_id, references(:expenses, on_delete: :delete_all)
      add :member_id, references(:members, on_delete: :delete_all)
    end

    create table(:expense_paid_for_members) do
      add :expense_id, references(:expenses, on_delete: :delete_all)
      add :member_id, references(:members, on_delete: :delete_all)
    end
  end
end
