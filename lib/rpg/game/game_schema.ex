defmodule Rpg.Game.GameSchema do
  @moduledoc """
  AuthSchema module
  """
  use Absinthe.Schema.Notation
  alias Rpg.Game.GameResolver

  input_object :character_input do
    field(:id, :id)
    field(:skill_points, non_null(:integer))
    field(:skin, non_null(:integer))
    field(:health, non_null(:integer))
    field(:attack, non_null(:integer))
    field(:defense, non_null(:integer))
    field(:magik, non_null(:integer))
  end

  object :character do
    field(:id, non_null(:id))
    field(:skill_points, non_null(:integer))
    field(:skin, non_null(:integer))
    field(:health, non_null(:integer))
    field(:attack, non_null(:integer))
    field(:rank, non_null(:integer))
    field(:defense, non_null(:integer))
    field(:magik, non_null(:integer))
    field(:reanimate_at, :datetime)
  end

  object :game_queries do
    @desc "Get characters list"
    field :characters, list_of(non_null(:character)) do
      arg(:user_id, non_null(:id))

      resolve(&GameResolver.list_characters/3)
    end

    @desc "Get character"
    field :character, :character do
      arg(:id, non_null(:id))

      resolve(&GameResolver.character/3)
    end
  end

  object :game_mutations do
    @desc "Upsert character"
    field :upsert_character, :character do
      arg(:input, non_null(:character_input))

      resolve(&GameResolver.upsert_character/3)
    end
  end
end
