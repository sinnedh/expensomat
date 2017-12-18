defmodule ApiServerWeb.MemberControllerTest do
  use ApiServerWeb.ConnCase

  alias ApiServer.Calculations

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  defp create_calculation(conn), do: create_calculation(conn, %{name: "A calculation"})
  defp create_calculation(_, attrs) do
    {:ok, calculation} = Calculations.create_calculation(attrs)
    {:ok, calculation: calculation}
  end

  defp create_member(calculation) do
    create_member(calculation, %{name: "Kalle", token: "ABCD"})
  end
  defp create_member(calculation, %{name: name, token: token}) do
    {:ok, member} = Calculations.create_member(%{
      "calculation_id" => calculation.id,
      "name" => name,
      "token" => token,
    })
    {:ok, member: member}
  end

  describe "index" do
    setup [:create_calculation]

    test "list all members of calculation for all members", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)
      {:ok, member: member2} = create_member(calculation, %{name: "Keek", token: "EFGH"})

      expected_response = [
        %{"id" => member1.id, "name" => "Kalle"},
        %{"id" => member2.id, "name" => "Keek"},
      ]

      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, member1.token))
      |> json_response(200)
      |> Map.fetch!("data")

      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, member2.token))
      |> json_response(200)
      |> Map.fetch!("data")
    end

    test "does not list members of other calculations", %{conn: conn, calculation: calculation} do
      {:ok, member: member1} = create_member(calculation)
      {:ok, member: member2} = create_member(calculation, %{name: "Keek", token: "EFGH"})

      {:ok, calculation: other_calculation} = create_calculation(%{name: "Other calculation"})
      {:ok, member: other_member} = create_member(other_calculation, %{name: "Franky", token: "IJKL"})

      expected_response = [
        %{"id" => member1.id, "name" => "Kalle"},
        %{"id" => member2.id, "name" => "Keek"},
      ]
      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, member1.token))
      |> json_response(200)
      |> Map.fetch!("data")

      expected_response = [%{"id" => other_member.id, "name" => "Franky"}]
      assert expected_response == conn
      |> get(calculation_member_path(conn, :index, other_member.token))
      |> json_response(200)
      |> Map.fetch!("data")
    end
  end

  describe "create member" do
    test "renders member when data is valid"
    test "renders errors when data is invalid"
    test "creates a new token for this member"
    test "ignores a possible token in request"
    test "creates member only when token is valid"
  end

  describe "update member" do
    test "renders member when data is valid"
    test "renders errors when data is invalid"
    test "ignores a possible token in request"
    test "updates member only when token is valid"
  end

  describe "delete member" do
    test "deletes chosen member"
    test "deletes member only when token is valid"
  end
end
