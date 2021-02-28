defmodule Rpg.Game do
  @moduledoc """
  The Game context.
  """

  import Ecto.Query, warn: false
  alias Rpg.Repo
  alias Rpg.Game.{Character, Fight, FightCharacter}

  @doc """
  Gets user's characters.
  ## Examples
      iex> get_user_characters(123)
      [%User{}]
      iex> get_user_characters(456)
      []
  """
  def get_user_characters(user_id),
    do: Repo.all(from(c in Character, where: c.user_id == ^user_id))

  @doc """
  Gets user's characters that are not KO.
  ## Examples
      iex> get_ok_user_characters(123)
      [%Character{}]
      iex> get_ok_user_characters(456)
      []
  """
  def get_ok_user_characters_execpted(user_id, now, excludes),
    do:
      Repo.all(
        from(c in Character,
          where:
            c.user_id == ^user_id and
              (c.reanimate_at <= ^now or (is_nil(c.reanimate_at) and not (c.id in ^excludes)))
        )
      )

  @doc """
  Creates fight.
  ## Examples
      iex> create_fight(%{field: value})
      {:ok, %Fight{}}
      iex> create_fight(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def create_fight(attrs \\ %{}) do
    %Fight{}
    |> Fight.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Creates fight_character.
  ## Examples
      iex> create_fight_character(%{field: value})
      {:ok, %FightCharacter{}}
      iex> create_fight_character(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def create_fight_character(attrs \\ %{}) do
    %FightCharacter{}
    |> FightCharacter.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Gets a single character.
  Raises `Ecto.NoResultsError` if the User does not exist.
  ## Examples
      iex> get_character!(123)
      %User{}
      iex> get_character!(456)
      ** (Ecto.NoResultsError)
  """
  def get_character!(id), do: Repo.get!(Character, id)

  @doc """
  Creates or update a character.
  ## Examples
      iex> create_or_update_character(%{field: value})
      {:ok, %Character{}}
      iex> create_or_update_character(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def create_or_update_character(attrs \\ %{}) do
    case Map.get(attrs, :id) do
      nil ->
        %Character{}

      id ->
        case get_character!(id) do
          nil -> %Character{}
          %Character{} = p -> p
        end
    end
    |> Character.changeset(attrs)
    |> Repo.insert_or_update()
  end

  @doc """
  Gets a single character.
  Raises `Ecto.NoResultsError` if the User does not exist.
  ## Examples
      iex> update_character_win(123)
      %Character{}
      iex> update_character_win(456)
      ** (Ecto.NoResultsError)
  """
  def update_character_win(id) do
    from(c in Character,
      update: [set: [rank: fragment("rank + 1"), skill_points: fragment("skill_points + 1")]],
      where: c.id == ^id
    )
    |> Repo.update_all([])
  end

  @doc """
  Gets a single character.
  Raises `Ecto.NoResultsError` if the User does not exist.
  ## Examples
      iex> update_character_loose(123)
      %Character{}
      iex> update_character_loose(456)
      ** (Ecto.NoResultsError)
  """
  def update_character_loose(id) do
    character = get_character!(id)

    case character.rank do
      1 ->
        from(c in Character,
          update: [
            set: [
              rank: fragment("rank - 1"),
              reanimate_at: ^(DateTime.now!("Etc/UTC") |> DateTime.add(3600, :second))
            ]
          ],
          where: c.id == ^id
        )

      _ ->
        from(c in Character,
          update: [set: [reanimate_at: ^DateTime.now!("Etc/UTC")]],
          where: c.id == ^id
        )
    end
    |> Repo.update_all([])
  end
end
