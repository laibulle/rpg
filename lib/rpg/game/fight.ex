defmodule Rpg.Game.Fight do
  @moduledoc """
  Character schema
  """

  use Ecto.Schema
  import Ecto.Changeset

  alias Rpg.Game.{Fight, FightCharacter}

  schema "fights" do
    timestamps()
    has_many(:characters, FightCharacter)
  end

  @required []

  @optional []

  def changeset(%Fight{} = fight, params) do
    fight
    |> cast(params, @required ++ @optional)
    |> validate_required(@required)
  end
end
