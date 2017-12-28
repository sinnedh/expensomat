defmodule ApiServerWeb.CalculationController do
  use ApiServerWeb, :controller

  alias ApiServer.Calculations
  alias ApiServer.Calculations.Calculation

  action_fallback ApiServerWeb.FallbackController

  def index(conn, _params) do
    calculations = Calculations.list_calculations()
    render(conn, "index.json", calculations: calculations)
  end

  def create(conn, %{"calculation" => calculation_params}) do
    with {:ok, %Calculation{} = calculation} <- Calculations.create_calculation(calculation_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", calculation_path(conn, :show, calculation))
      |> render("show.json", calculation: calculation)
    end
  end

  def show(conn, %{"token" => token}) do
    member = Calculations.get_member_for_token!(token)
    calculation = Calculations.get_calculation!(member.calculation_id)
    render(conn, "show.json", calculation: calculation, member: member)
  end

  def update(conn, %{"token" => token, "calculation" => calculation_params}) do
    calculation = Calculations.get_calculation_for_token!(token)

    with {:ok, %Calculation{} = calculation} <- Calculations.update_calculation(calculation, calculation_params) do
      render(conn, "show.json", calculation: calculation)
    end
  end

  def delete(conn, %{"token" => token}) do
    calculation = Calculations.get_calculation_for_token!(token)
    with {:ok, %Calculation{}} <- Calculations.delete_calculation(calculation) do
      send_resp(conn, :no_content, "")
    end
  end
end
