defmodule RpgWeb.AutoFightTest do
  use ExUnit.Case

  import Rpg.TestConn
  import Rpg.Fixtures
  alias Rpg.Game.{AutoFight, Matchmaking}

  setup do
    checkout()
    user = user_fixture()
    character = character_fixture(user.id, %{"rank" => 5})

    [user: user, character: character]
  end

  test "fight will produce a winner and a round history", %{
    character: character,
    user: user
  } do
    opponent = character_fixture(user.id)

    res =
      AutoFight.fight(
        %{character: character, health: character.health},
        %{character: opponent, health: opponent.health}
      )

    assert res.rounds > 0
    assert res.winner == character.id or res.winner == opponent.id
  end
end
