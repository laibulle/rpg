import Config

# List of all used env vars along with information if they're required
env_vars = [
  {"DOMAIN", :required},
  {"BASE_URL", :required},
  {"PORT", :required},
  {"SECRET_KEY_BASE", :required},
  {"POOL_SIZE", :required},
  {"DATABASE_URL", :required},
  {"MAILJET_PRIVATE_KEY", :required},
  {"MAILJET_API_KEY", :required}
]

{pool_size, ""} = Integer.parse(System.fetch_env!("POOL_SIZE"))

config :rpg, Rpg.Repo,
  url: System.fetch_env!("DATABASE_URL"),
  pool_size: pool_size,
  ssl: true

config :rpg, RpgWeb.Endpoint,
  server: true,
  http: [port: System.fetch_env!("PORT")],
  url: [
    scheme: "https",
    host: System.fetch_env!("BASE_URL"),
    base_url: System.fetch_env!("DOMAIN"),
    port: 443
  ],
  cache_static_manifest: "priv/static/cache_manifest.json",
  secret_key_base: System.fetch_env!("SECRET_KEY_BASE"),
  check_origin: false

config :rpg, Rpg.Mailer,
  adapter: Bamboo.MailjetAdapter,
  api_key: System.fetch_env!("MAILJET_API_KEY"),
  api_private_key: System.fetch_env!("MAILJET_PRIVATE_KEY")
