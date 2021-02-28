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

  object :fight_character do
    field(:winner, non_null(:boolean))
    field(:character_id, non_null(:id))
  end

  object :fight do
    field(:id, non_null(:id))
    field(:inserted_at, non_null(:string))
    field(:characters, list_of(non_null(:fight_character)))
  end

  object :fight_report do
    field(:winner, :id)
    field(:rounds, non_null(list_of(non_null(:round))))
  end

  object :round do
    field(:damages, non_null(:integer))
    field(:attacker, non_null(:id))
    field(:dice_value, non_null(:integer))
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
    field(:fights, non_null(list_of(:fight)))
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

    @desc "Upsert character"
    field :fight, :fight_report do
      arg(:character_id, non_null(:id))

      resolve(&GameResolver.fight/3)
    end
  end
end
