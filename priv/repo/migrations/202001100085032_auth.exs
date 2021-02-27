defmodule Rpg.Repo.Migrations.Auth do
  @moduledoc """
  Init migration
  """
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:email, :string, null: false)
      add(:password_hash, :string, null: false)
      add(:name, :string, null: false)
      add(:enabled, :boolean, null: false, default: false)
      add(:deleted_at, :utc_datetime)

      timestamps()
    end

    create unique_index(:users, [:email])

    create table(:activation_codes) do
      add(:code, :string, null: false)
      add(:user_id, references(:users, on_delete: :nothing), null: false)
      add(:deleted_at, :utc_datetime)

      timestamps()
    end

    create index(:activation_codes, [:user_id])
    unique_index(:activation_codes, [:code])
  end
end
