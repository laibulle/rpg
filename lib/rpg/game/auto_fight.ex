defmodule Rpg.Game.AutoFight do
  @moduledoc """
  AutoFight module
  """

  alias Rpg.Game
  alias Rpg.Game.{Character, FightRules}

  @max_null_rounds 50

  @doc """
  To avoid infinite fight we stop the fight after 10 failedd attacks in a row
  """
  def fight(attacker, defender, rounds, 0),
    do: %{rounds: rounds, winner: nil}

  def fight(attacker, defender, rounds \\ [], null_rounds \\ @max_null_rounds) do
    dice = FightRules.roll_dice(attacker.character)
    damages = FightRules.compute_health_points(dice, attacker.character, defender.character)
    defender = %{defender | health: defender.health - damages}

    rounds = rounds ++ [%{damages: damages, attacker: attacker.character.id, dice_value: dice}]

    if defender.health > 0 do
      fight(defender, attacker, rounds, null_rounds_count(damages, null_rounds))
    else
      handle_fight_end(attacker.character, defender.character)
      %{rounds: rounds, winner: attacker.character.id}
    end
  end

  defp null_rounds_count(damages, null_rounds) do
    if(damages > 0) do
      @max_null_rounds
    else
      null_rounds - 1
    end
  end

  def handle_fight_end(winner, looser) do
    Game.update_character_win(winner.id)
    Game.update_character_loose(looser.id)
    {:ok, fight} = Game.create_fight(%{})

    {:ok, _} =
      Game.create_fight_character(%{character_id: winner.id, winner: true, fight_id: fight.id})

    {:ok, _} =
      Game.create_fight_character(%{character_id: looser.id, winner: false, fight_id: fight.id})
  end
end
