defmodule ApiServerWeb.MemberController do
  use ApiServerWeb, :controller

  alias ApiServer.Calculations
  alias ApiServer.Calculations.Member

  action_fallback ApiServerWeb.FallbackController

  def index(conn, %{"calculation_token" => calculation_token}) do
    calculation = Calculations.get_calculation_for_token!(calculation_token)
    render(conn, "index.json", members: calculation.members)
  end

  def create(conn, %{"calculation_token" => calculation_token, "member" => member_params}) do
    calculation = Calculations.get_calculation_for_token!(calculation_token)
    with {:ok, %Member{} = member} <- Calculations.create_member(calculation, member_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", calculation_member_path(conn, :show, calculation, member))
      |> render("show.json", member: member)
    end
  end

  def update(conn, %{"calculation_token" => calculation_token, "id" => id, "member" => member_params}) do
    calculation = Calculations.get_calculation_for_token!(calculation_token)
    member = Calculations.get_member!(id)
    # TODO: check if member is in same calculation here!

    with {:ok, %Member{} = member} <- Calculations.update_member(member, member_params) do
      render(conn, "show.json", member: member)
    end
  end
end
