defmodule Rpg.Game.GameResolver do
  @moduledoc """
  GameResolver module
  """

  alias Rpg.Game
  alias Rpg.Game.{Character, AutoFight, Matchmaking}
  alias Rpg.Graphql.ErrorHelper
  import Canada, only: [can?: 2]

  def list_characters(_parent, %{user_id: user_id}, _resolution) do
    {:ok, Rpg.Game.get_user_characters(user_id)}
  end

  def character(_parent, %{id: id}, _resolution) do
    {:ok, Map.merge(Rpg.Game.get_character!(id), %{fights: Game.list_character_fights(id)})}
  end

  def fight(_parent, %{character_id: character_id}, _resolution) do
    character = Game.get_character!(character_id)

    case Matchmaking.get_opponent(character) do
      {:ok, opponent} ->
        {:ok,
         AutoFight.fight(
           %{character: character, health: character.health},
           %{character: opponent, health: opponent.health}
         )}

      error ->
        ErrorHelper.format(error)
    end
  end

  def upsert_character(_parent, %{input: input}, %{
        context: %{
          current_user: current_user
        }
      }) do
    [authorized, old_character] =
      if Map.has_key?(input, :id) do
        old_character = Game.get_character!(input.id)
        [can?(current_user, update(old_character)), old_character]
      else
        [true, nil]
      end

    if authorized do
      input
      |> Map.put(:user_id, current_user.id)
      |> Game.create_or_update_character()
      |> ErrorHelper.format()
    else
      ErrorHelper.format({:error, :are_you_cheating})
    end
  end
end
