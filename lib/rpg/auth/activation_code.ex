defmodule Rpg.Auth.ActivationCode do
  @moduledoc """
  The ActivationCode schema
  """
  use Ecto.Schema
  import Ecto.Changeset

  alias Rpg.Auth.User

  schema "activation_codes" do
    field(:code, :string)
    belongs_to(:user, User)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:code, :user_id])
    |> validate_required([:code, :user_id])
  end

  def random_string(length) do
    :crypto.strong_rand_bytes(length) |> Base.url_encode64() |> binary_part(0, length)
  end
end
