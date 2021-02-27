defmodule RpgWeb.Presence do
  use Phoenix.Presence,
    otp_app: :rpg,
    pubsub_server: Rpg.PubSub
end
