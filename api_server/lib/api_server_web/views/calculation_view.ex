defmodule ApiServerWeb.CalculationView do
  use ApiServerWeb, :view
  alias ApiServerWeb.CalculationView

  def render("index.json", %{calculations: calculations}) do
    %{data: render_many(calculations, CalculationView, "calculation.json")}
  end

  def render("show.json", %{calculation: calculation, member: member}) do
    %{
      user: render_one(member, ApiServerWeb.MemberView, "member.json"),
      data: render_one(calculation, CalculationView, "calculation.json")
    }
  end

  def render("calculation.json", %{calculation: calculation}) do
    %{id: calculation.id,
      name: calculation.name,
      members: render_many(calculation.members, ApiServerWeb.MemberView, "member_with_token.json"),
      description: calculation.description,
      matrix: ApiServer.Calculations.matrix_for_calculation(calculation)
    }
  end
end
