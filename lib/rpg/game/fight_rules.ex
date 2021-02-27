defmodule Rpg.Game.FightRules do
  @moduledoc """
  FightRules module
  """
  def compute_health_points(dice_value, attacker, defender) do
    damages_value(dice_value, attacker, defender, dice_value > defender.defense)
  end

  def damages_value(_dice_value, _attacker, _defender, false), do: 0

  def damages_value(dice_value, attacker, defender, true) do
    defense_diff = dice_value - defender.defense
    defense_diff + magical_damages(defense_diff == attacker.magik, defense_diff)
  end

  def magical_damages(false, _value), do: 0

  def magical_damages(true, value), do: value

  def roll_dice(%{attack: 0}), do: 0

  def roll_dice(%{attack: attack}), do: :rand.uniform(attack)
end
