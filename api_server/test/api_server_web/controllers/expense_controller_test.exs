defmodule ApiServerWeb.ExpenseControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.Calculations

  @create_attrs %{"amount" => 42, "description" => "some description", "paid_by" => [], "paid_for" => [], "paid_at" => "2010-04-17 14:00:00.000000Z"}
  @update_attrs %{"amount" => 43, "description" => "some updated description", "paid_at" => "2011-05-18 15:01:01.000000Z"}
  @invalid_attrs %{"amount" => nil, "description" => nil}

  setup %{conn: conn} do
    {:ok, calculation} = Calculations.create_calculation(%{name: "Main calculation"})
    {:ok, member1} = Calculations.create_member(%{"name" => "Paul", "calculation_id" => calculation.id, "token" => "ABCD", "role" => "admin"})
    {:ok, member2} = Calculations.create_member(%{"name" => "Paula", "calculation_id" => calculation.id, "token" => "EFGH", "role" => "editor"})

    {
      :ok,
      conn: put_req_header(conn, "accept", "application/json"),
      calculation: calculation,
      member1: member1,
      member2: member2,
    }
  end

  def fixture(calculation, :expense) do
    {:ok, expense} = Calculations.create_expense(calculation, @create_attrs)
    expense
  end

  def fixture(calculation, member1, member2, :expense) do
    create_attrs = @create_attrs
    |> Map.put("paid_by", [member1.id])
    |> Map.put("paid_for", [member2.id])
    {:ok, expense} = Calculations.create_expense(calculation, create_attrs)
    expense
  end

  describe "index" do

    test "lists all expenses for a given calculation", %{conn: conn, calculation: calculation, member1: member1} do
      {:ok, other_calculation} = Calculations.create_calculation(%{name: "Another calculation"})
      fixture(calculation, :expense)
      fixture(calculation, :expense)
      fixture(other_calculation, :expense)

      conn = get conn, calculation_expense_path(conn, :index, member1.token)
      assert length(json_response(conn, 200)["data"]) == 2
    end

    test "list no expenses from other calculations", %{conn: conn, member1: member1} do
      {:ok, other_calculation} = Calculations.create_calculation(%{name: "Another calculation"})
      fixture(other_calculation, :expense)
      fixture(other_calculation, :expense)

      conn = get conn, calculation_expense_path(conn, :index, member1.token)
      assert json_response(conn, 200)["data"] == []
    end


    test "forbidden when no valid token", %{conn: conn} do
      assert "Forbidden" == conn
      |> get(calculation_expense_path(conn, :index, "NVLD_TKN"))
      |> json_response(403)
    end
  end

  describe "create expense" do
    test "renders expense when data is valid", %{conn: conn, member1: member1, member2: member2} do
      create_attrs = @create_attrs
      |> Map.put("paid_by", [member1.id])
      |> Map.put("paid_for", [member2.id])
      conn = post conn, calculation_expense_path(conn, :create, member1.token), expense: create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, calculation_expense_path(conn, :show, member1.token, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 42,
        "description" => "some description",
        "paid_by" => [%{"id" => member1.id, "name" => member1.name, "role" => member1.role}],
        "paid_for" => [%{"id" => member2.id, "name" => member2.name, "role" => member2.role}],
        "paid_at" => "2010-04-17T14:00:00Z",
      }
    end

    test "renders errors when data is invalid", %{conn: conn, member1: member1} do
      conn = post conn, calculation_expense_path(conn, :create, member1.token), expense: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "forbidden when no valid token", %{conn: conn} do
      assert "Forbidden" == conn
      |> post(calculation_expense_path(conn, :create, "NVLD_TKN"), expense: @create_attrs)
      |> json_response(403)
    end

    test "forbidden when user is observer", %{conn: conn, calculation: calculation} do
      {:ok, observer} = Calculations.create_member(calculation, %{"name" => "Observer", "token" => "ABCD", "role" => "observer"})
      assert "Forbidden" == conn
      |> post(calculation_expense_path(conn, :create, observer.token), expense: @create_attrs)
      |> json_response(403)
    end

    test "allowed when user is editor", %{conn: conn, calculation: calculation} do
      {:ok, editor} = Calculations.create_member(calculation, %{"name" => "Editor", "token" => "ABCD", "role" => "editor"})
      conn
      |> post(calculation_expense_path(conn, :create, editor.token), expense: @create_attrs)
      |> json_response(201)
    end

    test "allowed when user is admin", %{conn: conn, calculation: calculation} do
      {:ok, admin} = Calculations.create_member(calculation, %{"name" => "Admin", "token" => "ABCD", "role" => "admin"})
      conn
      |> post(calculation_expense_path(conn, :create, admin.token), expense: @create_attrs)
      |> response(201)
    end
  end

  describe "update expense" do
    test "renders expense when data is valid", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      id = expense.id
      conn = put conn, calculation_expense_path(conn, :update, member1.token, expense), expense: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, calculation_expense_path(conn, :show, member1.token, expense)
      assert json_response(conn, 200)["data"] == %{
        "id" => expense.id,
        "amount" => 43,
        "description" => "some updated description",
        "paid_by" => [%{"id" => member1.id, "name" => member1.name, "role" => member1.role}],
        "paid_for" => [%{"id" => member2.id, "name" => member2.name, "role" => member2.role}],
        "paid_at" => "2011-05-18T15:01:01Z",
      }
    end

    test "works when only description is updated", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)

      id = expense.id
      conn = put conn,
        calculation_expense_path(conn, :update, member1.token, expense),
        expense: %{"description" => "the updated description"}

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, calculation_expense_path(conn, :show, member1.token, expense)
      assert json_response(conn, 200)["data"] == %{
        "id" => expense.id,
        "amount" => 42,
        "description" => "the updated description",
        "paid_by" => [%{"id" => member1.id, "name" => member1.name, "role" => member1.role}],
        "paid_for" => [%{"id" => member2.id, "name" => member2.name, "role" => member2.role}],
        "paid_at" => "2010-04-17T14:00:00Z",
      }
    end

    test "renders errors when data is invalid", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      conn = put conn, calculation_expense_path(conn, :update, member1.token, expense), expense: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "forbidden when no valid token", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      assert "Forbidden" == conn
      |> put(calculation_expense_path(conn, :update, "NVLD_TKN", expense), expense: @update_attrs)
      |> json_response(403)
    end

    test "forbidden when user is observer", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      {:ok, observer} = Calculations.create_member(calculation, %{"name" => "Observer", "token" => "ABCD", "role" => "observer"})
      assert "Forbidden" == conn
      |> put(calculation_expense_path(conn, :update, observer.token, expense), expense: @update_attrs)
      |> json_response(403)
    end

    test "allowed when user is editor", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      {:ok, editor} = Calculations.create_member(calculation, %{"name" => "Editor", "token" => "ABCD", "role" => "editor"})
      conn
      |> put(calculation_expense_path(conn, :update, editor.token, expense), expense: @update_attrs)
      |> json_response(200)
    end

    test "allowed when user is admin", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      {:ok, admin} = Calculations.create_member(calculation, %{"name" => "Admin", "token" => "ABCD", "role" => "admin"})
      conn
      |> put(calculation_expense_path(conn, :update, admin.token, expense), expense: @update_attrs)
      |> response(200)
    end
  end

  describe "delete expense" do
    test "deleted expense sets deleted_at", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      conn = delete conn, calculation_expense_path(conn, :delete, member1.token, expense)
      assert response(conn, 204)

      deleted_expense = Calculations.get_deleted_expense!(expense.id)
      assert deleted_expense.deleted_at != nil
    end

    test "deleted calculation results in get with 404", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      conn = delete conn, calculation_expense_path(conn, :delete, member1.token, expense)
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get conn, calculation_expense_path(conn, :show, member1.token, expense)
      end
    end

    test "forbidden when no valid token", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      assert "Forbidden" == conn
      |> delete(calculation_expense_path(conn, :delete, "NVLD_TKN", expense))
      |> json_response(403)
    end

    test "forbidden when user is observer", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      {:ok, observer} = Calculations.create_member(calculation, %{"name" => "Observer", "token" => "ABCD", "role" => "observer"})
      assert "Forbidden" == conn
      |> delete(calculation_expense_path(conn, :delete, observer.token, expense))
      |> json_response(403)
    end

    test "allowed when user is editor", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      {:ok, editor} = Calculations.create_member(calculation, %{"name" => "Editor", "token" => "ABCD", "role" => "editor"})
      conn
      |> delete(calculation_expense_path(conn, :delete, editor.token, expense))
      |> response(204)
    end

    test "allowed when user is admin", %{conn: conn, calculation: calculation, member1: member1, member2: member2} do
      expense = fixture(calculation, member1, member2, :expense)
      {:ok, admin} = Calculations.create_member(calculation, %{"name" => "Admin", "token" => "ABCD", "role" => "admin"})
      conn
      |> delete(calculation_expense_path(conn, :delete, admin.token, expense))
      |> response(204)
    end
  end
end
