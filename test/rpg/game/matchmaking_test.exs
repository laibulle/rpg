defmodule RpgWeb.MatchmakingTest do
  use ExUnit.Case

  import Rpg.TestConn
  import Rpg.Fixtures
  alias Rpg.Game.Matchmaking

  setup do
    checkout()
    user = user_fixture()
    character = character_fixture(user.id, %{"rank" => 5})

    [user: user, character: character]
  end

  test "matchmaking excludes KO characters", %{
    character: character,
    user: user
  } do
    character2 =
      character_fixture(user.id, %{
        "reanimate_at" => DateTime.utc_now() |> DateTime.add(10000, :second)
      })

    character3 = character_fixture(user.id)

    assert {:ok, character3} == Matchmaking.get_opponent(character)
  end

  test "matchmaking return error when no fight ervailable", %{
    character: character,
    user: user
  } do
    character_fixture(user.id, %{
      "reanimate_at" => DateTime.utc_now() |> DateTime.add(10000, :second)
    })

    assert {:error, :no_fighter_available} == Matchmaking.get_opponent(character)
  end

  test "matchmaking finds best rank match", %{
    character: character,
    user: user
  } do
    character_fixture(user.id, %{"rank" => 10})
    opponent1 = character_fixture(user.id, %{"rank" => 6})
    opponent2 = character_fixture(user.id, %{"rank" => 4})

    {:ok, res} = Matchmaking.get_opponent(character)

    assert res == opponent1 || res == opponent2
  end
end
