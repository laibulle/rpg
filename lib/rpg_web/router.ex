defmodule RpgWeb.Router do
  use RpgWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ensure_authenticated do
    plug Rpg.Auth.AuthAccessPipeline
    plug Rpg.Auth.Context
  end

  pipeline :api do
    plug CORSPlug, origin: "*"
    plug :accepts, ["json"]
    plug ProperCase.Plug.SnakeCaseParams
  end

  scope "/", RpgWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/v1", RpgWeb.Api.V1, as: :api_v1 do
    pipe_through [:api]

    get "/users/activate/:code", UserController, :activate
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: RpgWeb.Telemetry
    end
  end

  scope "/graphql" do
    pipe_through [:api, :ensure_authenticated]

    match :*, "/graphiql", Absinthe.Plug.GraphiQL,
      schema: RpgWeb.Schema,
      interface: :playground

    match :*, "/", Absinthe.Plug, schema: RpgWeb.Schema
  end

  scope "/", RpgWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
