defmodule Rpg.Game.FightCharacter do
  @moduledoc """
  FightCharacter schema
  """

  use Ecto.Schema
  import Ecto.Changeset

  alias Rpg.Game.{Fight, Character, FightCharacter}

  schema "fight_characters" do
    field(:winner, :boolean)
    belongs_to(:character, Character)
    belongs_to(:fight, Fight)

    timestamps()
  end

  @required [:character_id, :fight_id, :winnner]

  @optional []

  def changeset(%FightCharacter{} = character, params) do
    character
    |> cast(params, @required ++ @optional)
    |> validate_required(@required)
  end
end
