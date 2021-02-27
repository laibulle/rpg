defmodule Rpg.Repo do
  use Ecto.Repo,
    otp_app: :rpg,
    adapter: Ecto.Adapters.Postgres
end
