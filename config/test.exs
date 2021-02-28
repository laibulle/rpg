use Mix.Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :rpg, Rpg.Repo,
  username: "postgres",
  password: "postgres",
  database: "rpg_test#{System.get_env("MIX_TEST_PARTITION")}",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

config :rpg, Rpg.Mailer,
  adapter: Bamboo.MailjetAdapter,
  api_key: System.fetch_env("MAILJET_API_KEY"),
  api_private_key: System.fetch_env("MAILJET_PRIVATE_KEY")

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :rpg, RpgWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
