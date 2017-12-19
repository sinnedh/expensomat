defmodule ApiServerWeb.MemberController do
  use ApiServerWeb, :controller

  alias ApiServer.Calculations
  alias ApiServer.Calculations.Member

  action_fallback ApiServerWeb.FallbackController

  def index(conn, %{"calculation_token" => calculation_token}) do
    calculation = Calculations.get_calculation_for_token!(calculation_token)
    render(conn, "index.json", members: calculation.members)
  end
end
