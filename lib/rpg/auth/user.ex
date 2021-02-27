defmodule Rpg.Auth.User do
  @moduledoc """
  User schema
  """

  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:email, :string)
    field(:name, :string)
    field(:password, :string, virtual: true)
    field(:password_hash, :string)
    field(:enabled, :boolean, default: false)

    timestamps()
  end

  @required [
    :email,
    :password_hash,
    :name,
    :enabled
  ]

  @optional []

  def changeset(user, params) do
    user
    |> cast(params, @required ++ @optional)
    |> validate_required(@required)
    |> unique_constraint(:users_pkey)
    |> unique_constraint(:users, name: :users_email_index)
  end

  def registration_changeset(user, params) do
    user
    |> cast(params, @required ++ @optional)
    |> cast(params, ~w(password)a, [])
    |> validate_length(:password, min: 6, max: 100)
    |> hash_password
    |> validate_required(@required)
    |> unique_constraint(:users_pkey)
    |> unique_constraint(:users, name: :users_email_index)
  end

  defp hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{changes: %{password: password}} ->
        put_change(
          changeset,
          :password_hash,
          Argon2.hash_pwd_salt(password)
        )

      _ ->
        changeset
    end
  end
end
