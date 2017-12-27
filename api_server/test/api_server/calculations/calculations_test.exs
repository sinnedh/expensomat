defmodule ApiServer.CalculationsTest do
  use ApiServer.DataCase

  alias ApiServer.Calculations

  describe "calculations" do
    alias ApiServer.Calculations.Calculation

    @valid_attrs %{"description" => "some description", "name" => "some name"}
    @update_attrs %{"description" => "some updated description", "name" => "some updated name"}
    @invalid_attrs %{"description" => nil, "name" => nil}

    def calculation_fixture(attrs \\ %{}) do
      {:ok, calculation} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Calculations.create_calculation()

      calculation |> Repo.preload([:members])
    end

    test "list_calculations/0 returns all calculations" do
      calculation = calculation_fixture()
      assert Calculations.list_calculations() == [calculation]
    end

    test "list_calculations/0 does not list deleted calculations" do
      calculation1 = calculation_fixture()
      calculation2 = calculation_fixture()
      calculation_fixture(%{"deleted_at" => "2011-06-18 15:01:01.000000Z"})
      assert Calculations.list_calculations() == [calculation1, calculation2]
    end

    test "get_calculation!/1 returns the calculation with given id" do
      calculation = calculation_fixture()
      assert Calculations.get_calculation!(calculation.id) == calculation
    end

    test "get_calculation!/1 does not return deleted calculation" do
      calculation = calculation_fixture(%{"deleted_at" => "2011-06-18 15:01:01.000000Z"})
      assert_raise Ecto.NoResultsError, fn ->
        Calculations.get_calculation!(calculation.id)
      end
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

    test "delete_calculation/1 sets the deleted_at timestamp" do
      calculation = calculation_fixture()
      assert {:ok, %Calculation{}} = Calculations.delete_calculation(calculation)
      assert_raise Ecto.NoResultsError, fn ->
        Calculations.get_calculation!(calculation.id)
      end
    end

    test "change_calculation/1 returns a calculation changeset" do
      calculation = calculation_fixture()
      assert %Ecto.Changeset{} = Calculations.change_calculation(calculation)
    end
  end

  describe "expenses" do
    alias ApiServer.Calculations.Expense

    @valid_attrs %{"amount" => 42, "description" => "some description", "paid_by" => [], "paid_for" => [], "paid_at" => "2010-04-17 14:00:00.000000Z"}
    @update_attrs %{"amount" => 43, "description" => "some updated description", "paid_at" => "2011-05-18 15:01:01.000000Z"}
    @invalid_attrs %{"amount" => nil, "description" => nil, "paid_by" => [], "paid_for" => []}

    def expense_fixture() do
      calculation = calculation_fixture()
      expense_fixture(calculation)
    end

    def expense_fixture(calculation, attrs \\ %{}) do
      attrs = attrs
        |> Map.put("calculation_id", calculation.id)
        |> Enum.into(@valid_attrs)

      {:ok, expense} = Calculations.create_expense(calculation, attrs)

      expense |> Repo.preload([:paid_by, :paid_for])
    end

    test "list_expenses/1 returns all expenses for calculation" do
      calculation1 = calculation_fixture()
      calculation2 = calculation_fixture()

      expense1 = expense_fixture(calculation1)
      expense2 = expense_fixture(calculation1)
      expense3 = expense_fixture(calculation2)

      assert Calculations.list_expenses(calculation1.id) == [expense1, expense2]
      assert Calculations.list_expenses(calculation2.id) == [expense3]
    end

    test "list_expenses/1 does not list deleted expenses" do
      calculation = calculation_fixture()

      expense1 = expense_fixture(calculation)
      expense2 = expense_fixture(calculation)
      expense_fixture(calculation, %{"deleted_at" => "2011-06-18 15:01:01.000000Z"})

      assert Calculations.list_expenses(calculation.id) == [expense1, expense2]
    end

    test "get_expense!/1 returns the expense with given id" do
      expense = expense_fixture()
      assert Calculations.get_expense!(expense.id) == expense
    end

    test "get_expense!/1 does not return deleted expense" do
      expense = calculation_fixture()
      |> expense_fixture(%{"deleted_at" => "2011-06-18 15:01:01.000000Z"})
      assert_raise Ecto.NoResultsError, fn ->
        Calculations.get_expense!(expense.id)
      end
    end

    test "create_expense/1 with valid data creates a expense" do
      calculation = calculation_fixture()
      assert {:ok, %Expense{} = expense} = Calculations.create_expense(calculation, @valid_attrs)
      assert expense.amount == 42
      assert expense.description == "some description"
    end

    test "create_expense/1 with paid_by" do
      calculation = calculation_fixture()
      peter = member_fixture(%{"name" => "Peter", "calculation_id" => calculation.id, "token" => "ABCD"})
      paul = member_fixture(%{"name" => "Paul", "calculation_id" => calculation.id, "token" => "EFGH"})
      calculation = Map.put(calculation, "members", [peter, paul])

      valid_attrs = Map.put(@valid_attrs, "paid_by", [peter.id])

      assert {:ok, %Expense{} = expense} = Calculations.create_expense(calculation, valid_attrs)
      assert expense.paid_by == [peter]
    end

    test "create_expense/1 with paid_for" do
      calculation = calculation_fixture()
      peter = member_fixture(%{"name" => "Peter", "calculation_id" => calculation.id, "token" => "ABCD"})
      paul = member_fixture(%{"name" => "Paul", "calculation_id" => calculation.id, "token" => "EFGH"})
      calculation = Map.put(calculation, "members", [peter, paul])

      valid_attrs = Map.put(@valid_attrs, "paid_for", [peter.id])

      assert {:ok, %Expense{} = expense} = Calculations.create_expense(calculation, valid_attrs)
      assert expense.paid_for == [peter]
    end

    test "create_expense/1 with paid_by and paid_for" do
      calculation = calculation_fixture()
      peter = member_fixture(%{"name" => "Peter", "calculation_id" => calculation.id, "token" => "ABC"})
      paul = member_fixture(%{"name" => "Paul", "calculation_id" => calculation.id, "token" => "DEF"})
      mary = member_fixture(%{"name" => "Mary", "calculation_id" => calculation.id, "token" => "GHI"})
      calculation = Map.put(calculation, "members", [peter, paul, mary])

      valid_attrs = @valid_attrs
        |> Map.put("paid_by", [paul.id])
        |> Map.put("paid_for", [peter.id, mary.id, paul.id])

      assert {:ok, %Expense{} = expense} = Calculations.create_expense(calculation, valid_attrs)
      assert expense.paid_by == [paul]
      assert expense.paid_for == [peter, paul, mary]
    end

    test "create_expense/1 with invalid data returns error changeset" do
      calculation = calculation_fixture()
      assert {:error, %Ecto.Changeset{}} = Calculations.create_expense(calculation, @invalid_attrs)
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

  describe "members" do
    alias ApiServer.Calculations.Member

    @valid_attrs %{"name" => "some name", "token" => "ABCD", "role" => "admin"}
    @update_attrs %{"name" => "some updated name", "role" => "editor"}
    @invalid_attrs %{"name" => nil}

    def member_fixture(attrs \\ %{}) do
      {:ok, member} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Calculations.create_member()

      member
    end

    test "list_members/0 returns all members" do
      calculation = calculation_fixture()
      member = member_fixture %{"calculation_id" => calculation.id}
      assert Calculations.list_members() == [member]
    end

    test "get_member!/1 returns the member with given id" do
      calculation = calculation_fixture()
      member = member_fixture %{"calculation_id" => calculation.id}
      assert Calculations.get_member!(member.id) == member
    end

    test "create_member/1 with valid data creates a member" do
      calculation = calculation_fixture()
      assert {:ok, %Member{} = member} = Calculations.create_member(calculation, @valid_attrs)
      assert member.name == "some name"
    end

    test "create_member/1 with invalid data returns error changeset" do
      calculation = calculation_fixture()
      assert {:error, %Ecto.Changeset{}} = Calculations.create_member(calculation, @invalid_attrs)
    end

    test "update_member/2 with valid data updates the member" do
      calculation = calculation_fixture()
      member = member_fixture %{"calculation_id" => calculation.id}
      assert {:ok, member} = Calculations.update_member(member, @update_attrs)
      assert %Member{} = member
      assert member.name == "some updated name"
      assert member.role == "editor"
    end

    test "update_member/2 with invalid data returns error changeset" do
      calculation = calculation_fixture()
      member = member_fixture %{"calculation_id" => calculation.id}
      assert {:error, %Ecto.Changeset{}} = Calculations.update_member(member, @invalid_attrs)
      assert member == Calculations.get_member!(member.id)
    end

    test "delete_member/1 deletes the member" do
      calculation = calculation_fixture()
      member = member_fixture %{"calculation_id" => calculation.id}
      assert {:ok, %Member{}} = Calculations.delete_member(member)
      assert_raise Ecto.NoResultsError, fn -> Calculations.get_member!(member.id) end
    end

    test "change_member/1 returns a member changeset" do
      calculation = calculation_fixture()
      member = member_fixture %{"calculation_id" => calculation.id}
      assert %Ecto.Changeset{} = Calculations.change_member(member)
    end
  end

  describe "calculation matrix" do
    setup do
      calculation = calculation_fixture()
      peter = member_fixture(%{"name" => "Peter", "calculation_id" => calculation.id, "token" => "ABCD"})
      paul = member_fixture(%{"name" => "Paul", "calculation_id" => calculation.id, "token" => "EFGH"})
      mary = member_fixture(%{"name" => "Mary", "calculation_id" => calculation.id, "token" => "IJKL"})
      calculation = Map.put(calculation, "members", [peter, paul, mary])
      %{calculation: calculation, peter: peter, paul: paul, mary: mary}
    end


    test "with three members and multiple expenses", %{calculation: calculation, peter: peter, paul: paul, mary: mary} do
      expense_fixture(calculation, %{"amount" => 510, "paid_by" => [peter.id], "paid_for" => [peter.id, paul.id, mary.id]})
      expense_fixture(calculation, %{"amount" => 180, "paid_by" => [paul.id], "paid_for" => [peter.id, paul.id, mary.id]})
      expense_fixture(calculation, %{"amount" => 240, "paid_by" => [paul.id], "paid_for" => [peter.id, paul.id, mary.id]})
      expense_fixture(calculation, %{"amount" => 330, "paid_by" => [peter.id], "paid_for" => [peter.id, paul.id, mary.id]})
      expense_fixture(calculation, %{"amount" => 480, "paid_by" => [peter.id], "paid_for" => [peter.id, paul.id, mary.id]})

      matrix = ApiServer.Calculations.matrix_for_calculation(calculation)

      assert length(Map.keys(matrix)) == 6
      assert matrix["#{paul.id}_#{paul.id}"] == 140
      assert matrix["#{paul.id}_#{peter.id}"] == 140
      assert matrix["#{paul.id}_#{mary.id}"] == 140
      assert matrix["#{peter.id}_#{paul.id}"] == 440
      assert matrix["#{peter.id}_#{peter.id}"] == 440
      assert matrix["#{peter.id}_#{mary.id}"] == 440
    end

    test "with two members and multiple paid_by and paid_for", %{calculation: calculation, peter: peter, paul: paul} do
      expense_fixture(calculation, %{"amount" => 340, "paid_by" => [paul.id, peter.id], "paid_for" => [paul.id, peter.id]})

      matrix = ApiServer.Calculations.matrix_for_calculation(calculation)

      assert length(Map.keys(matrix)) == 4
      assert matrix["#{paul.id}_#{paul.id}"] == 85
      assert matrix["#{paul.id}_#{peter.id}"] == 85
      assert matrix["#{peter.id}_#{paul.id}"] == 85
      assert matrix["#{peter.id}_#{peter.id}"] == 85
    end

    test "with two members and multiple paid_for", %{calculation: calculation, peter: peter, paul: paul} do
      expense_fixture(calculation, %{"amount" => 340, "paid_by" => [paul.id], "paid_for" => [paul.id, peter.id]})

      matrix = ApiServer.Calculations.matrix_for_calculation(calculation)

      assert length(Map.keys(matrix)) == 2
      assert matrix["#{paul.id}_#{paul.id}"] == 170
      assert matrix["#{paul.id}_#{peter.id}"] == 170
    end

    test "with two members and multiple paid_by", %{calculation: calculation, peter: peter, paul: paul} do
      expense_fixture(calculation, %{"amount" => 500, "paid_by" => [paul.id, peter.id], "paid_for" => [paul.id]})

      matrix = ApiServer.Calculations.matrix_for_calculation(calculation)

      assert length(Map.keys(matrix)) == 2
      assert matrix["#{paul.id}_#{paul.id}"] == 250
      assert matrix["#{peter.id}_#{paul.id}"] == 250
    end

    test "with two members", %{calculation: calculation, peter: peter, paul: paul} do
      expense_fixture(calculation, %{"amount" => 500, "paid_by" => [peter.id], "paid_for" => [paul.id]})
      expense_fixture(calculation, %{"amount" => 240, "paid_by" => [peter.id], "paid_for" => [paul.id]})
      expense_fixture(calculation, %{"amount" => 200, "paid_by" => [paul.id], "paid_for" => [peter.id]})
      expense_fixture(calculation, %{"amount" => 150, "paid_by" => [paul.id], "paid_for" => [peter.id]})

      matrix = ApiServer.Calculations.matrix_for_calculation(calculation)

      assert length(Map.keys(matrix)) == 2
      assert matrix["#{peter.id}_#{paul.id}"] == 740
      assert matrix["#{paul.id}_#{peter.id}"] == 350
    end

    test "with single member", %{calculation: calculation, peter: peter} do
      expense_fixture(calculation, %{"amount" => 500, "paid_by" => [peter.id], "paid_for" => [peter.id]})
      expense_fixture(calculation, %{"amount" => 200, "paid_by" => [peter.id], "paid_for" => [peter.id]})

      matrix = ApiServer.Calculations.matrix_for_calculation(calculation)

      assert length(Map.keys(matrix)) == 1
      assert matrix["#{peter.id}_#{peter.id}"] == 700
    end

    test "with no expenses", %{calculation: calculation} do
      matrix = ApiServer.Calculations.matrix_for_calculation(calculation)

      assert matrix == %{}
    end

  end
end
