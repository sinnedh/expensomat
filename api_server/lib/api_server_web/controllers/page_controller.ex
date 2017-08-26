defmodule ApiServerWeb.PageController do
  use ApiServerWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
