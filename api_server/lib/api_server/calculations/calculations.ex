defmodule ApiServer.Calculations do
  @moduledoc """
  The Calculations context.
  """

  import Ecto.Query, warn: false
  alias ApiServer.Repo

  alias ApiServer.Calculations.Calculation

  @doc """
  Returns the list of calculations (optionally with preloaded members).

  ## Examples

      iex> list_calculations()
      [%Calculation{}, ...]

  """
  def list_calculations(:no_preload) do
    Repo.all(Calculation)
  end

  def list_calculations do
    list_calculations(:no_preload)
    |> Repo.preload(:members)
  end

  @doc """
  Gets a single calculation (optionally with preloaded members).

  Raises `Ecto.NoResultsError` if the Calculation does not exist.

  ## Examples

      iex> get_calculation!(123)
      %Calculation{}

      iex> get_calculation!(456)
      ** (Ecto.NoResultsError)

  """
  def get_calculation!(:no_preload, id), do: Repo.get!(Calculation, id)

  def get_calculation!(id) do
     get_calculation!(:no_preload, id)
     |> Repo.preload(:members)
   end

  @doc """
  Creates a calculation.

  ## Examples

      iex> create_calculation(%{field: value})
      {:ok, %Calculation{}}

      iex> create_calculation(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_calculation(:no_preload, attrs) do
    %Calculation{}
    |> Calculation.changeset(attrs)
    |> Repo.insert()
  end

  def create_calculation(attrs \\ %{}) do
    case create_calculation(:no_preload, attrs) do
      {:ok, new_calculation} ->
        {:ok, new_calculation |> ApiServer.Repo.preload(:members)}
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  @doc """
  Updates a calculation.

  ## Examples

      iex> update_calculation(calculation, %{field: new_value})
      {:ok, %Calculation{}}

      iex> update_calculation(calculation, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_calculation(:no_preload, %Calculation{} = calculation, attrs) do
    calculation
    |> Calculation.changeset(attrs)
    |> Repo.update()
  end

  def update_calculation(%Calculation{} = calculation, attrs \\ %{}) do
    case update_calculation(:no_preload, calculation, attrs) do
      {:ok, updated_calculation} ->
        {:ok, updated_calculation |> ApiServer.Repo.preload(:members)}
      {:error, changeset} ->
        {:error, changeset}
    end
  end


  @doc """
  Deletes a Calculation.

  ## Examples

      iex> delete_calculation(calculation)
      {:ok, %Calculation{}}

      iex> delete_calculation(calculation)
      {:error, %Ecto.Changeset{}}

  """
  def delete_calculation(%Calculation{} = calculation) do
    Repo.delete(calculation)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking calculation changes.

  ## Examples

      iex> change_calculation(calculation)
      %Ecto.Changeset{source: %Calculation{}}

  """
  def change_calculation(%Calculation{} = calculation) do
    Calculation.changeset(calculation, %{})
  end

  alias ApiServer.Calculations.Expense

  @doc """
  Returns the list of expenses for a given calculation.

  ## Examples

      iex> list_expenses(23)
      [%Expense{}, ...]

  """
  def list_expenses(:no_preload, calculation_id) do
    Repo.all(from e in Expense, where: e.calculation_id == ^calculation_id)
  end

  def list_expenses(calculation_id) do
    list_expenses(:no_preload, calculation_id)
    |> Repo.preload([:paid_by, :paid_for])
  end

  @doc """
  Gets a single expense.

  Raises `Ecto.NoResultsError` if the Expense does not exist.

  ## Examples

      iex> get_expense!(123)
      %Expense{}

      iex> get_expense!(456)
      ** (Ecto.NoResultsError)

  """
  def get_expense!(:no_preload, id) do
    Repo.get!(Expense, id)
  end

  def get_expense!(id) do
    get_expense!(:no_preload, id)
    |> Repo.preload([:paid_by, :paid_for])
  end

  @doc """
  Creates a expense.

  ## Examples

      iex> create_expense(%{field: value})
      {:ok, %Expense{}}

      iex> create_expense(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_expense(:no_preload, calculation, attrs) do
    attrs = attrs |> Map.put("calculation_id", calculation.id)
    %Expense{}
    |> Expense.changeset(attrs)
    |> Repo.insert()
  end

  def create_expense(calculation, attrs \\ %{}) do
    case create_expense(:no_preload, calculation, attrs) do
      {:ok, new_expense} ->
        {:ok, new_expense |> ApiServer.Repo.preload([:paid_by, :paid_for])}
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  @doc """
  Updates a expense.

  ## Examples

      iex> update_expense(expense, %{field: new_value})
      {:ok, %Expense{}}

      iex> update_expense(expense, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_expense(:no_preload, %Expense{} = expense, attrs) do
    expense
    |> Expense.changeset(attrs)
    |> Repo.update()
  end

  def update_expense(%Expense{} = expense, attrs) do
    case update_expense(:no_preload, expense, attrs) do
      {:ok, updated_expense} ->
        {:ok, updated_expense |> ApiServer.Repo.preload([:paid_by, :paid_for])}
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  @doc """
  Deletes a Expense.

  ## Examples

      iex> delete_expense(expense)
      {:ok, %Expense{}}

      iex> delete_expense(expense)
      {:error, %Ecto.Changeset{}}

  """
  def delete_expense(%Expense{} = expense) do
    Repo.delete(expense)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking expense changes.

  ## Examples

      iex> change_expense(expense)
      %Ecto.Changeset{source: %Expense{}}

  """
  def change_expense(%Expense{} = expense) do
    Expense.changeset(expense, %{})
  end

  alias ApiServer.Calculations.Member

  @doc """
  Returns the list of members.

  ## Examples

      iex> list_members()
      [%Member{}, ...]

  """
  def list_members do
    Repo.all(Member)
  end

  @doc """
  Gets a single member.

  Raises `Ecto.NoResultsError` if the Member does not exist.

  ## Examples

      iex> get_member!(123)
      %Member{}

      iex> get_member!(456)
      ** (Ecto.NoResultsError)

  """
  def get_member!(id), do: Repo.get!(Member, id)

  @doc """
  Creates a member.

  ## Examples

      iex> create_member(%{field: value})
      {:ok, %Member{}}

      iex> create_member(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_member(attrs \\ %{}) do
    %Member{}
    |> Member.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a member.

  ## Examples

      iex> update_member(member, %{field: new_value})
      {:ok, %Member{}}

      iex> update_member(member, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_member(%Member{} = member, attrs) do
    member
    |> Member.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Member.

  ## Examples

      iex> delete_member(member)
      {:ok, %Member{}}

      iex> delete_member(member)
      {:error, %Ecto.Changeset{}}

  """
  def delete_member(%Member{} = member) do
    Repo.delete(member)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking member changes.

  ## Examples

      iex> change_member(member)
      %Ecto.Changeset{source: %Member{}}

  """
  def change_member(%Member{} = member) do
    Member.changeset(member, %{})
  end
end
