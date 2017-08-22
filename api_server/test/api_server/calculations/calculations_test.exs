defmodule ApiServer.CalculationsTest do
  use ApiServer.DataCase

  alias ApiServer.Calculations

  describe "calculations" do
    alias ApiServer.Calculations.Calculation

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil}

    def calculation_fixture(attrs \\ %{}) do
      {:ok, calculation} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Calculations.create_calculation()

      calculation
    end

    test "list_calculations/0 returns all calculations" do
      calculation = calculation_fixture()
      assert Calculations.list_calculations() == [calculation]
    end

    test "get_calculation!/1 returns the calculation with given id" do
      calculation = calculation_fixture()
      assert Calculations.get_calculation!(calculation.id) == calculation
    end

    test "create_calculation/1 with valid data creates a calculation" do
      assert {:ok, %Calculation{} = calculation} = Calculations.create_calculation(@valid_attrs)
      assert calculation.description == "some description"
      assert calculation.name == "some name"
    end

    test "create_calculation/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Calculations.create_calculation(@invalid_attrs)
    end

    test "update_calculation/2 with valid data updates the calculation" do
      calculation = calculation_fixture()
      assert {:ok, calculation} = Calculations.update_calculation(calculation, @update_attrs)
      assert %Calculation{} = calculation
      assert calculation.description == "some updated description"
      assert calculation.name == "some updated name"
    end

    test "update_calculation/2 with invalid data returns error changeset" do
      calculation = calculation_fixture()
      assert {:error, %Ecto.Changeset{}} = Calculations.update_calculation(calculation, @invalid_attrs)
      assert calculation == Calculations.get_calculation!(calculation.id)
    end

    test "delete_calculation/1 deletes the calculation" do
      calculation = calculation_fixture()
      assert {:ok, %Calculation{}} = Calculations.delete_calculation(calculation)
      assert_raise Ecto.NoResultsError, fn -> Calculations.get_calculation!(calculation.id) end
    end

    test "change_calculation/1 returns a calculation changeset" do
      calculation = calculation_fixture()
      assert %Ecto.Changeset{} = Calculations.change_calculation(calculation)
    end
  end

  describe "expenses" do
    alias ApiServer.Calculations.Expense

    @valid_attrs %{amount: 42, description: "some description"}
    @update_attrs %{amount: 43, description: "some updated description"}
    @invalid_attrs %{amount: nil, description: nil}

    def expense_fixture(attrs \\ %{}) do
      {:ok, expense} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Calculations.create_expense()

      expense
    end

    test "list_expenses/0 returns all expenses" do
      expense = expense_fixture()
      assert Calculations.list_expenses() == [expense]
    end

    test "get_expense!/1 returns the expense with given id" do
      expense = expense_fixture()
      assert Calculations.get_expense!(expense.id) == expense
    end

    test "create_expense/1 with valid data creates a expense" do
      assert {:ok, %Expense{} = expense} = Calculations.create_expense(@valid_attrs)
      assert expense.amount == 42
      assert expense.description == "some description"
    end

    test "create_expense/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Calculations.create_expense(@invalid_attrs)
    end

    test "update_expense/2 with valid data updates the expense" do
      expense = expense_fixture()
      assert {:ok, expense} = Calculations.update_expense(expense, @update_attrs)
      assert %Expense{} = expense
      assert expense.amount == 43
      assert expense.description == "some updated description"
    end

    test "update_expense/2 with invalid data returns error changeset" do
      expense = expense_fixture()
      assert {:error, %Ecto.Changeset{}} = Calculations.update_expense(expense, @invalid_attrs)
      assert expense == Calculations.get_expense!(expense.id)
    end

    test "delete_expense/1 deletes the expense" do
      expense = expense_fixture()
      assert {:ok, %Expense{}} = Calculations.delete_expense(expense)
      assert_raise Ecto.NoResultsError, fn -> Calculations.get_expense!(expense.id) end
    end

    test "change_expense/1 returns a expense changeset" do
      expense = expense_fixture()
      assert %Ecto.Changeset{} = Calculations.change_expense(expense)
    end
  end
end
