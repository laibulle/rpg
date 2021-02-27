defmodule Rpg.Auth do
  @moduledoc """
  The Auth context.
  """

  import Ecto.Query, warn: false
  alias Rpg.Repo

  alias Rpg.Auth.{ActivationCode, User}

  @doc """
  Gets a single from email.
  Raises `Ecto.NoResultsError` if the User does not exist.
  ## Examples
      iex> get_user!(123)
      %User{}
      iex> get_user!(456)
      ** (Ecto.NoResultsError)
  """
  def get_user_by_email(email), do: Repo.one(from(u in User, where: u.email == ^email))

  @doc """
  Gets a single user.
  Raises `Ecto.NoResultsError` if the User does not exist.
  ## Examples
      iex> get_user!(123)
      %User{}
      iex> get_user!(456)
      ** (Ecto.NoResultsError)
  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Gets a single user.
  ## Examples
      iex> get_user!(123)
      %User{}
      iex> get_user!(456)
      nil
  """
  def get_user(id), do: Repo.get(User, id)

  @doc """
  Creates a user.
  ## Examples
      iex> create_user(%{field: value})
      {:ok, %User{}}
      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.registration_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.
  ## Examples
      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}
  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  @doc """
  Returns the list of activation codes.
  ## Examples
      iex> list_activation_codes_by_user()
      [%ActivationCode{}, ...]
  """
  def list_activation_codes_by_user(user_id),
    do: Repo.all(from(c in ActivationCode, where: c.user_id == ^user_id))

  @doc """
  Creates a activation_code.
  ## Examples
      iex> create_activation_code(%{field: value})
      {:ok, %ActivationCode{}}
      iex> create_activation_code(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def create_activation_code(attrs \\ %{}) do
    %ActivationCode{}
    |> ActivationCode.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Deletes a ActivationCode.
  ## Examples
      iex> delete_activation_code(activation_code)
      {:ok, %ActivationCode{}}
      iex> delete_activation_code(activation_code)
      {:error, %Ecto.Changeset{}}
  """
  def delete_activation_code(%ActivationCode{} = activation_code) do
    Repo.delete(activation_code)
  end
end
