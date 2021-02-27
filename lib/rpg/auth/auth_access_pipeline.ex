defmodule Rpg.Auth.AuthAccessPipeline do
  @moduledoc """
  AuthAccessPipeline
  """
  use Guardian.Plug.Pipeline, otp_app: :rpg

  plug(Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"})
  # plug(Guardian.Plug.EnsureAuthenticated)
  plug(Guardian.Plug.LoadResource, allow_blank: true)
end
