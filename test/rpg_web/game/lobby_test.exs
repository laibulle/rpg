defmodule RpgWeb.Game.LobbyTest do
  use RpgWeb.ChannelCase

  import Rpg.TestConn
  import Rpg.Fixtures
  alias RpgWeb.UserSocket
  alias RpgWeb.RoomChannel
  alias Rpg.Auth.TokenGenerate

  setup do
    checkout()
    user1 = user_fixture("player1@rpg.io")
    user2 = user_fixture("player2@rpg.io")

    character1 = character_fixture(user1.id)
    character2 = character_fixture(user2.id)

    [user1: user1, user2: user2, character1: character1, character2: character2]
  end

  test "mutation: login invalid user returns error", %{
    user1: user1,
    character1: character1,
    user2: user2,
    character2: character2
  } do
    {:ok, %{access_token: access_token1}} = TokenGenerate.create_tokens(user1)

    {:ok, _, socket1} =
      UserSocket
      |> socket("user_id", %{some: :assign})
      |> subscribe_and_join(RoomChannel, "lobby:testlobby1", %{
        "token" => access_token1,
        "characterId" => character1.id
      })

    {:ok, %{access_token: access_token2}} = TokenGenerate.create_tokens(user2)

    {:ok, _, socket2} =
      UserSocket
      |> socket("user_id", %{some: :assign})
      |> subscribe_and_join(RoomChannel, "lobby:testlobby1", %{
        "token" => access_token2,
        "characterId" => character2.id
      })
  end
end
