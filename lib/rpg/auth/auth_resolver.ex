defmodule Rpg.Resolvers.Auth do
  @moduledoc """
  AuthResolver module
  """
  alias Rpg.Graphql.ErrorHelper
  alias Rpg.Auth
  alias Rpg.Auth.TokenGenerate
  alias Rpg.Repo
  alias Rpg.Email
  alias Rpg.Mailer
  alias Rpg.Auth.ActivationCode

  defp preload_user(user) do
    user
    |> Repo.preload([])
  end

  def create_user(_parent, %{input: params}, _resolution) do
    case Map.merge(params, %{"enabled" => true}) |> Auth.create_user() do
      # Create your email
      {:ok, user} ->
        {:ok, activation_code} =
          Auth.create_activation_code(%{
            user_id: user.id,
            code: ActivationCode.random_string(64)
          })

        Email.welcome_email(user.email, activation_code.code)
        |> Mailer.deliver_now()

        {:ok, user} |> ErrorHelper.format()

      error ->
        error |> ErrorHelper.format()
    end
  end

  def token(_parent, %{refresh_token: refresh_token}, _resolution) do
    {:ok, %{"sub" => sub}} = Rpg.Guardian.decode_and_verify(refresh_token)

    Auth.get_user!(sub) |> TokenGenerate.create_tokens()
  end

  def auth(_parent, %{input: %{email: email, password: password}}, _resolution) do
    case get_user_by_email(email, password) do
      nil ->
        {:error, :bad_credentials}

      user ->
        case user.enabled do
          true ->
            {:ok, %{access_token: access_token, refresh_token: refresh_token}} =
              user |> TokenGenerate.create_tokens()

            {:ok,
             %{
               access_token: access_token,
               refresh_token: refresh_token,
               user: user |> preload_user()
             }}

          false ->
            {:error, :not_enabled}
        end
    end
  end

  defp get_user_by_email(email, password) do
    case Auth.get_user_by_email(email) do
      nil ->
        nil

      user ->
        case Argon2.verify_pass(password, user.password_hash) do
          true -> user
          false -> nil
        end
    end
  end
end
