defmodule Rpg.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Rpg.Repo,
      # Start the Telemetry supervisor
      RpgWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Rpg.PubSub},
      # Start the Endpoint (http/https)
      RpgWeb.Endpoint,
      {Rpg.Game.GameMonitor, %{}},
      RpgWeb.Presence
      # Start a worker by calling: Rpg.Worker.start_link(arg)
      # {Rpg.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Rpg.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    RpgWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
