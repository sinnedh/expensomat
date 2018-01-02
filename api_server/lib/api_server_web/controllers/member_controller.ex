defmodule ApiServerWeb.MemberController do
  use ApiServerWeb, :controller

  alias ApiServer.Calculations
  alias ApiServer.Calculations.Member

  action_fallback ApiServerWeb.FallbackController

  def index(conn, %{"calculation_token" => calculation_token}) do
    with {:ok, auth_member} <- Calculations.verify_token_with_role(calculation_token, ["observer", "editor", "admin"]),
         calculation = Calculations.get_calculation!(auth_member.calculation_id),
      do: render(conn, "index.json", members: calculation.members)
  end

  def create(conn, %{"calculation_token" => calculation_token, "member" => member_params}) do
    with {:ok, auth_member} <- Calculations.verify_token_with_role(calculation_token, ["admin"]),
         calculation = Calculations.get_calculation!(auth_member.calculation_id),
         {:ok, %Member{} = new_member} <- Calculations.create_member(calculation, member_params),
      do: conn
        |> put_status(:created)
        |> put_resp_header("location", calculation_member_path(conn, :show, calculation, new_member))
        |> render("show.json", member: new_member)
  end

  def update(conn, %{"calculation_token" => calculation_token, "id" => id, "member" => member_params}) do
    with {:ok, _auth_member} <- Calculations.verify_token_with_role(calculation_token, ["admin"]),
         member <- Calculations.get_member!(id),
         {:ok, %Member{} = new_member} <- Calculations.update_member(member, member_params),
      do: render(conn, "show.json", member: new_member)
  end

  def delete(conn, %{"calculation_token" => calculation_token, "id" => id}) do
    with {:ok, _auth_member} <- Calculations.verify_token_with_role(calculation_token, ["admin"]),
         member <- Calculations.get_member!(id),
         {:ok, %Member{}} <- Calculations.delete_member(member),
      do: send_resp(conn, :no_content, "")
  end
end
