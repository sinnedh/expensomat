defmodule ApiServerWeb.CalculationView do
  use ApiServerWeb, :view
  alias ApiServerWeb.CalculationView

  def render("index.json", %{calculations: calculations}) do
    %{data: render_many(calculations, CalculationView, "calculation.json")}
  end

  def render("show.json", %{calculation: calculation}) do
    %{data: render_one(calculation, CalculationView, "calculation.json")}
  end

  def render("calculation.json", %{calculation: calculation}) do
    %{id: calculation.id,
      name: calculation.name,
      description: calculation.description}
  end
end
