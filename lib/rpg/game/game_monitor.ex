defmodule Rpg.Game.GameMonitor do
  @moduledoc """
  GameMonitor module
  """
  use Agent

  @doc """
    Used by the supervisor to start the Agent that will keep the game state persistent.
   The initial value passed to the Agent is an empty map.
  """
  def start_link(initial_value) do
    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end

  defp status_key(lobby), do: "#{lobby}:status"

  @doc """
   Put a new player in the map
  """
  def initialize(lobby) do
    Agent.update(__MODULE__, &Map.put(&1, lobby, %{}))
    update_status(lobby, :waiting)
    :ok
  end

  @doc """
    Update the player information in the map
  """
  def update_status(lobby, status) do
    Agent.update(__MODULE__, &Map.put(&1, status_key(lobby), status))
  end

  @doc """
    Update the player information in the map
  """
  def get_status(lobby) do
    Agent.get(__MODULE__, &Map.fetch(&1, status_key(lobby)))
  end

  @doc """
   Put a new player in the map
  """
  def put_player(lobby, player) do
    players = players(lobby)

    Agent.update(__MODULE__, &Map.put(&1, lobby, Map.put(players, player.user.id, player)))
    player
  end

  @doc """
  Delete a player
  """
  def delete_player(lobby, player_id) do
    players = players(lobby)

    Agent.update(__MODULE__, &Map.put(&1, lobby, Map.delete(players, player_id)))
  end

  @doc """
    Retrieve a player from the map
  """
  def get_player(lobby, player_id) do
    Map.fetch!(players(lobby), player_id)
  end

  @doc """
    Update the player information in the map
  """
  def update_player(lobby, player) do
    Agent.update(
      __MODULE__,
      &Map.put(&1, player.id, Map.put(players(lobby), player.user.id, player))
    )

    player
  end

  @doc """
   Get all the players in the map
  """
  def players(lobby) do
    Agent.get(__MODULE__, &Map.get(&1, lobby))
  end
end
