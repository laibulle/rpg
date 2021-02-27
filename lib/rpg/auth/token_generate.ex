defmodule Rpg.Auth.TokenGenerate do
  @ttl {36500, :day}

  alias Rpg.Auth.User

  def create_tokens(%User{} = user) do
    claims = %{resource: "user"}

    {:ok, access_token, _} = Rpg.Guardian.encode_and_sign(user, claims, ttl: @ttl)

    {:ok, refresh_token, _} =
      Rpg.Guardian.encode_and_sign(
        user,
        claims
        |> Map.put(:typ, "refresh"),
        ttl: @ttl
      )

    {:ok, %{access_token: access_token, refresh_token: refresh_token}}
  end
end
