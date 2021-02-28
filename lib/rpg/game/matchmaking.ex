defmodule Rpg.Game.Matchmaking do
  @moduledoc """
  Matchmaking module
  """

  alias Rpg.Game.Character
  alias Rpg.Game

  def get_opponent(%Character{} = character) do
    Game.get_ok_user_characters_execpted(character.user_id, DateTime.utc_now(), [character.id])
    |> find_best_fighter(character)
  end

  def find_best_fighter([fighter], %Character{} = character), do: {:ok, fighter}

  def find_best_fighter([], %Character{} = character), do: {:error, :no_fighter_available}

  def find_best_fighter(opponents, %Character{} = character),
    do: {:ok, opponents |> Enum.shuffle() |> Enum.min_by(&abs(&1.rank - character.rank))}
end
