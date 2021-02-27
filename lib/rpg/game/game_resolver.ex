defmodule Rpg.Game.GameResolver do
  @moduledoc """
  GameResolver module
  """

  alias Rpg.Game
  alias Rpg.Game.Character
  alias Rpg.Graphql.ErrorHelper
  import Canada, only: [can?: 2]

  def list_characters(_parent, %{user_id: user_id}, _resolution) do
    {:ok, Rpg.Game.get_user_characters(user_id)}
  end

  def character(_parent, %{id: id}, _resolution) do
    {:ok, Rpg.Game.get_character!(id)}
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
