defmodule RpgWeb.CharacterSchemaTest do
  use RpgWeb.ConnCase

  import Rpg.TestConn
  import Rpg.Fixtures

  @character_query """
  query Character($id: ID!) {
    character(id: $id) {
      health
    }
  }
  """

  @characters_query """
  query Characters($user_id: ID!) {
    characters(user_id: $user_id) {
      health
    }
  }
  """

  setup do
    checkout()
    user = user_fixture()
    character = character_fixture(user.id)
    [user: user, character: character]
  end

  test "query: get character", %{conn: conn, character: character} do
    conn =
      post(conn, "/graphql", %{
        "query" => @character_query,
        "variables" => %{id: character.id}
      })

    assert json_response(conn, 200) == %{
             "data" => %{"character" => %{"health" => 2}}
           }
  end

  test "query: get characters for a user", %{conn: conn, user: user} do
    conn =
      post(conn, "/graphql", %{
        "query" => @characters_query,
        "variables" => %{user_id: user.id}
      })

    assert json_response(conn, 200) == %{
             "data" => %{"characters" => [%{"health" => 2}]}
           }
  end
end
