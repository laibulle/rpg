defmodule RpgWeb.Presence do
  @moduledoc """
  Presence module
  """
  use Phoenix.Presence,
    otp_app: :rpg,
    pubsub_server: Rpg.PubSub
end
