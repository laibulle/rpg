defmodule Rpg.Game.FightRulesTest do
  use ExUnit.Case

  import Rpg.TestConn
  import Rpg.Fixtures

  alias Rpg.Game.FightRules
  alias Rpg.Game

  test "receive 1 dammage points" do
    assert FightRules.compute_health_points(
             3,
             %{attack: 4, magik: 2},
             %{health: 24, defense: 2}
           ) == 1
  end

  test "receive 7 dammage points + 7 magical dammages points" do
    assert FightRules.compute_health_points(
             10,
             %{attack: 10, magik: 7},
             %{health: 24, defense: 3}
           ) == 14
  end

  test "user: win" do
    checkout()
    user = user_fixture()
    character = character_fixture(user.id)
    Game.update_character_win(character.id)

    updated_character = Game.get_character!(character.id)
    assert updated_character.skill_points == character.skill_points + 1
    assert updated_character.rank == character.rank + 1
  end

  test "user: loose" do
    checkout()
    user = user_fixture()
    character = character_fixture(user.id)

    assert character.rank == 1

    Game.update_character_loose(character.id)
    updated_character = Game.get_character!(character.id)
    assert updated_character.rank == 0
  end
end
