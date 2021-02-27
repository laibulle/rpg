defmodule Rpg.Repo.Migrations.Rpg do
  @moduledoc """
  Init migration
  """
  use Ecto.Migration

  def change do
    create table(:characters) do
      add(:user_id, references(:users, on_delete: :nothing), null: false)
      add(:skin, :integer, null: false)
      add(:skill_points, :integer, null: false)
      add(:health, :integer, null: false)
      add(:attack, :integer, null: false)
      add(:rank, :integer, null: false)
      add(:defense, :integer, null: false)
      add(:magik, :integer, null: false)
      add(:reanimate_at, :utc_datetime)

      timestamps()
    end

    create table(:fights) do
      timestamps()
    end

    create table(:fights_characters) do
      add(:character, references(:characters, on_delete: :nothing), null: false)
      add(:fight, references(:fights, on_delete: :nothing), null: false)
      timestamps()
    end
  end
end
