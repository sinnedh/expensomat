defmodule ApiServerWeb.CalculationController do
  use ApiServerWeb, :controller

  alias ApiServer.Calculations
  alias ApiServer.Calculations.Calculation

  action_fallback ApiServerWeb.FallbackController

  def index(conn, _params) do
    calculations = Calculations.list_calculations_with_members()
    render(conn, "index.json", calculations: calculations)
  end

  def create(conn, %{"calculation" => calculation_params}) do
    with {:ok, %Calculation{} = calculation} <- Calculations.create_calculation(calculation_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", calculation_path(conn, :show, calculation))
      |> render("show.json", calculation: calculation |> ApiServer.Repo.preload(:members))
    end
  end

  def show(conn, %{"id" => id}) do
    calculation = Calculations.get_calculation_with_members!(id)
    render(conn, "show.json", calculation: calculation)
  end

  def update(conn, %{"id" => id, "calculation" => calculation_params}) do
    calculation = Calculations.get_calculation!(id)

    with {:ok, %Calculation{} = calculation} <- Calculations.update_calculation(calculation, calculation_params) do
      render(conn, "show.json", calculation: calculation |> ApiServer.Repo.preload(:members))
    end
  end

  def delete(conn, %{"id" => id}) do
    calculation = Calculations.get_calculation!(id)
    with {:ok, %Calculation{}} <- Calculations.delete_calculation(calculation) do
      send_resp(conn, :no_content, "")
    end
  end
end
