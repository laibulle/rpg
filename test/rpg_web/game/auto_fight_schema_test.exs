defmodule RpgWeb.AutoFightSchemaTest do
  use RpgWeb.ConnCase

  import Rpg.TestConn
  import Rpg.Fixtures
  alias Rpg.Game.{AutoFight, Matchmaking}

  @fight_mutation """
  mutation Fight($character_id: ID!) {
    fight(character_id: $character_id) {
      winner
    }
  }
  """

  setup do
    checkout()
    user = user_fixture()
    character = character_fixture(user.id, %{"rank" => 5})
    [user: user, character: character]
  end

  test "mutation: fight", %{conn: conn, character: character, user: user} do
    opponent = character_fixture(user.id)

    conn =
      post(conn, "/graphql", %{
        "query" => @fight_mutation,
        "variables" => %{character_id: character.id}
      })

    res = json_response(conn, 200)["data"]["fight"]

    assert res["winner"] == "#{opponent.id}" or res["winner"] == "#{character.id}"
  end
end
