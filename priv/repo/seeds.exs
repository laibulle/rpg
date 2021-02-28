alias Rpg.Repo

alias Rpg.Auth.User
alias Rpg.Game.Character

data = File.read!(Path.join(:code.priv_dir(:rpg), "data.json")) |> Jason.decode!()

defmodule FHelper do
  def ko(v) do
    case v do
      true -> DateTime.utc_now() |> DateTime.add(3600, :second)
      false -> nil
    end
  end
end

Enum.each(data["users"], fn x ->
  {:ok, user} =
    %User{}
    |> User.registration_changeset(%{
      "id" => x["id"],
      "name" => x["name"],
      "email" => x["email"],
      "password" => x["password"],
      "enabled" => true
    })
    |> Repo.insert()

  Enum.each(x["characters"], fn x_char ->
    {:ok, _character} =
      %Character{}
      |> Character.changeset(%{
        "skin" => x_char["skin"],
        "rank" => x_char["rank"],
        "health" => x_char["health"],
        "attack" => x_char["attack"],
        "magik" => x_char["magik"],
        "defense" => x_char["defense"],
        "skill_points" => x_char["skill_points"],
        "user_id" => user.id,
        "reanimate_at" => FHelper.ko(x_char["ko"])
      })
      |> Repo.insert()
  end)
end)
