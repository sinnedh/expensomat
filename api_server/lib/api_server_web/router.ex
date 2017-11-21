defmodule ApiServerWeb.Router do
  use ApiServerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug CORSPlug
    plug :accepts, ["json"]
  end

  scope "/", ApiServerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", ApiServerWeb do
    pipe_through :api

    resources "/calculations", CalculationController, except: [:new, :edit], param: "token" do
      resources "/expenses", ExpenseController, except: [:new, :edit]
      options "/expenses", ExpenseController, :nothing
    end
    options "/calculations", CalculationController, :nothing

    get "/expenses", ExpenseController, :show
  end
end
