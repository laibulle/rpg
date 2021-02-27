defmodule Rpg.Game.CharacterTest do
  use ExUnit.Case

  alias Rpg.Game.Character

  setup do
    [
      old_character: %Character{
        health: 3,
        attack: 3,
        magik: 3,
        defense: 3,
        skill_points: 1
      }
    ]
  end

  test "increase health of 1 when we have 1 skill point returns :ok", %{
    old_character: old_character
  } do
    assert :ok ==
             Character.validate_skills(
               old_character,
               %{old_character | health: 4, skill_points: 0}
             )
  end

  test "increase health of 1 when we have 0 skill point returns :error", %{
    old_character: old_character
  } do
    assert :error ==
             Character.validate_skills(
               %{old_character | skill_points: 0},
               %{old_character | health: 4, skill_points: 0}
             )
  end

  test "increase health of 1 when we have 1 skill point but with bad new skill_point value returns :error",
       %{old_character: old_character} do
    assert :error ==
             Character.validate_skills(
               old_character,
               %{old_character | health: 4, skill_points: 10}
             )
  end
end
