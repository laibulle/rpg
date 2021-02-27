defmodule Rpg.Fixtures do
  alias Rpg.Repo

  alias Rpg.Auth.User
  alias Rpg.Game.Character

  def user_fixture(email \\ "janedoe@rpg.io") do
    {:ok, user} =
      %User{}
      |> User.registration_changeset(%{
        "name" => "Jane Doe",
        "username" => "janedoe",
        "email" => email,
        "password" => "P@ssw0rd",
        "enabled" => true
      })
      |> Repo.insert()

    user
  end

  def character_fixture(user_id) do
    {:ok, character} =
      %Character{}
      |> Character.changeset(%{
        "skin" => 1,
        "rank" => 1,
        "health" => 2,
        "attack" => 4,
        "magik" => 3,
        "defense" => 3,
        "skill_points" => 0,
        "user_id" => user_id
      })
      |> Repo.insert()

    character
  end
end
