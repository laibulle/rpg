# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :rpg,
  ecto_repos: [Rpg.Repo]

# Configures the endpoint
config :rpg, RpgWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "tBbiEyKVAsYuJpMOyz7+LF+s39AHPCJXc6kIhLofO4flg+QTynZr4hVMcrSqe6TN",
  render_errors: [view: RpgWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Rpg.PubSub,
  live_view: [signing_salt: "LWr7hY6i"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :rpg, Rpg.Guardian,
  issuer: "rpg",
  secret_key: "Im1rOGqJiq+VrqSztII8jsQTWv9Mvucv8tpZYHBn54xfnrVu/Y6pB21ob0pSuoVR"

config :rpg, Rpg.Auth.AuthAccessPipeline,
  module: Rpg.Guardian,
  error_handler: Rpg.Auth.AuthErrorHandler

config :husky,
  pre_commit: "mix format && mix credo --strict",
  pre_push: "mix format --check-formatted && mix credo --strict && mix test && mix coveralls"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
