defmodule Rpg.Game.Character do
  @moduledoc """
  Character schema
  """

  use Ecto.Schema
  import Ecto.Changeset

  alias Rpg.Game

  alias Rpg.Game.Character
  alias Rpg.Auth.User

  schema "characters" do
    field(:skill_points, :integer, null: false)
    field(:skin, :integer, null: false)
    field(:health, :integer, null: false)
    field(:attack, :integer, null: false)
    field(:rank, :integer, null: false, default: 1)
    field(:defense, :integer, null: false)
    field(:magik, :integer, null: false)
    field(:reanimate_at, :utc_datetime)
    belongs_to(:user, User)

    timestamps()
  end

  @required [:user_id, :skin, :skill_points, :health, :attack, :rank, :defense, :magik]

  @optional [:id, :reanimate_at]

  def changeset(%Character{} = character, params) do
    character
    |> cast(params, @required ++ @optional)
    |> validate_required(@required)
    |> validate_skills_changeset()
  end

  def validate_skills_changeset(%Ecto.Changeset{} = changeset) do
    case Map.get(changeset.data, :id) do
      nil ->
        changeset

      _id ->
        case validate_skills(changeset.data, Map.merge(changeset.data, changeset.changes)) do
          :ok -> changeset
          :error -> add_error(changeset, :skill_points, "are you trying to cheat?")
        end
    end
  end

  defimpl Canada.Can, for: User do
    def can?(%User{id: user_id}, action, %Character{user_id: character_user_id})
        when action in [:update, :read, :destroy, :touch],
        do: user_id == character_user_id

    def can?(%User{}, :create, Character), do: true
  end

  def skill_cost(0, _value, consumed_skill_points), do: consumed_skill_points

  def skill_cost(target, value \\ 0, consumed_skill_points \\ 0) do
    skill_points_cost =
      case value do
        0 -> 1
        v -> ceil(v / 5)
      end

    skill_cost(target - 1, value + 1, consumed_skill_points + skill_points_cost)
  end

  def validate_skills(%Character{} = old_values, character) do
    total_cost =
      skill_cost(character.attack - old_values.attack, old_values.attack) +
        skill_cost(character.defense - old_values.defense, old_values.defense) +
        skill_cost(character.magik - old_values.magik, old_values.magik) +
        (character.health - old_values.health)

    case total_cost > old_values.skill_points ||
           old_values.skill_points - total_cost != character.skill_points do
      true -> :error
      false -> :ok
    end
  end
end
