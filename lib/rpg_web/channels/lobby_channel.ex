defmodule RpgWeb.RoomChannel do
  @moduledoc """
  RoomChannel module
  """
  use Phoenix.Channel

  alias Rpg.Game
  alias Rpg.Auth.User
  alias Rpg.Auth
  alias Rpg.Game.{GameMonitor, Character}
  alias Rpg.Game.FightRules
  alias RpgWeb.Presence

  defp serialize_user(%User{} = user) do
    %{id: user.id, name: user.name}
  end

  defp serialize_character(%Character{} = character) do
    %{
      id: character.id,
      health: character.health,
      defense: character.defense,
      magik: character.magik,
      rank: character.rank,
      attack: character.attack,
      skin: character.skin
    }
  end

  def join("lobby:" <> lobby, %{"token" => token, "characterId" => character_id}, socket) do
    if Presence.list(socket) |> Enum.count() >= 2 || GameMonitor.get_status(lobby) == :ready do
      {:error, :limited_to_two_players}
    else
      {:ok, %{"sub" => sub}} = Rpg.Guardian.decode_and_verify(token)

      user = Auth.get_user(sub)

      character = Game.get_character!(character_id)

      true = user.id == character.user_id

      socket =
        assign(socket, :lobby, lobby) |> assign(:user_id, user.id) |> assign(:user_id, user.id)

      state = %{
        user: serialize_user(user),
        character: serialize_character(character),
        health: character.health,
        active: false
      }

      send(self(), {:after_join, state})
      {:ok, socket}
    end
  end

  def handle_info({:after_join, state}, socket) do
    lobby = socket.assigns.lobby

    if(
      Presence.list(socket) |> Enum.count() == 0 ||
        (Presence.list(socket) |> Enum.count() == 1 &&
           Map.has_key?(Presence.list(socket), socket.assigns.user_id))
    ) do
      GameMonitor.initialize(lobby)
    end

    {:ok, _} =
      Presence.track(socket, socket.assigns.user_id, %{
        online_at: inspect(System.system_time(:second))
      })

    GameMonitor.put_player(lobby, state)

    players = GameMonitor.players(socket.assigns.lobby)

    Enum.each(players, fn {_k, v} ->
      broadcast!(socket, "new_player", v)
    end)

    case Enum.count(players) do
      2 ->
        GameMonitor.update_status(socket.assigns.lobby, :ready)
        broadcast!(socket, Atom.to_string(:ready), %{})

        player = %{Map.fetch!(players, players |> Map.keys() |> List.first()) | active: true}
        GameMonitor.put_player(socket.assigns.lobby, player)

        broadcast!(
          socket,
          "update_player",
          GameMonitor.get_player(socket.assigns.lobby, player.user.id)
        )

      _ ->
        nil
    end

    {:noreply, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end

  def handle_in("attack", %{}, socket) do
    players = GameMonitor.players(socket.assigns.lobby) |> Map.to_list()

    {_, attacker} =
      players
      |> Enum.find(fn {_k, x} -> x.user.id == socket.assigns.user_id and x.active == true end)

    {_, defender} = players |> Enum.find(fn {_k, x} -> x.active == false end)

    damages =
      FightRules.roll_dice(attacker.character)
      |> FightRules.compute_health_points(attacker.character, defender.character)

    new_health = defender.health - damages

    new_health =
      if new_health < 0 do
        0
      else
        new_health
      end

    broadcast!(socket, "damages", %{defenderId: defender.user.id, damages: damages})
    attacker = GameMonitor.put_player(socket.assigns.lobby, %{attacker | active: false})

    defender =
      GameMonitor.put_player(socket.assigns.lobby, %{defender | active: true, health: new_health})

    broadcast!(
      socket,
      "update_player",
      attacker
    )

    broadcast!(
      socket,
      "update_player",
      defender
    )

    if defender.health <= 0 do
      Game.update_character_win(attacker.character.id)
      Game.update_character_loose(defender.character.id)

      GameMonitor.update_status(socket.assigns.lobby, :finished)
      broadcast!(socket, Atom.to_string(:finished), %{winner: attacker.user.id})
      GameMonitor.initialize(socket.assigns.lobby)
    end

    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    GameMonitor.delete_player(socket.assigns.lobby, socket.assigns.user_id)
    broadcast!(socket, "user_left", %{userId: socket.assigns.user_id})
    :ok
  end
end
