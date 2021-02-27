defmodule RpgWeb.Api.V1.UserController do
  use RpgWeb, :controller

  alias Rpg.Repo
  alias Rpg.Auth
  alias Rpg.Auth.User
  alias Rpg.Auth.ActivationCode

  def activate(conn, %{"code" => code}) do
    activation_code = Repo.get_by!(ActivationCode, code: code) |> Repo.preload(:user)

    changeset = Repo.get(User, activation_code.user.id) |> User.changeset(%{"enabled" => true})

    {:ok, _user} = Repo.update(changeset)
    {:ok, _} = Auth.delete_activation_code(activation_code)
    conn |> json(%{message: "user enabled"})
  end
end
