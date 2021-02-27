defmodule RpgWeb.UpsertCharacterSchemaTest do
  use RpgWeb.ConnCase

  import Rpg.TestConn
  import Rpg.Fixtures
  alias Rpg.Auth.TokenGenerate

  @upsert_character_mutation """
  mutation UpsertCharacter($input: CharacterInput!) {
    upsertCharacter(input: $input) {
      id
      attack
      health
    }
  }
  """

  setup do
    checkout()
    user = user_fixture()
    character = character_fixture(user.id)
    user2 = user_fixture("someon@de.io")
    character_not_owned = character_fixture(user2.id)

    {:ok, %{access_token: access_token}} = TokenGenerate.create_tokens(user)

    [
      user: user,
      access_token: access_token,
      character: character,
      character_not_owned: character_not_owned
    ]
  end

  test "upsert character returns character", %{
    conn: conn,
    access_token: access_token,
    character: character
  } do
    conn =
      conn
      |> put_req_header("authorization", "Bearer #{access_token}")
      |> post("/graphql", %{
        "query" => @upsert_character_mutation,
        "variables" => %{
          input: %{
            id: character.id,
            skin: character.skin,
            skill_points: character.skill_points,
            health: character.health,
            defense: character.defense,
            magik: character.magik,
            attack: character.attack
          }
        }
      })

    res = json_response(conn, 200)

    assert "#{character.id}" == res["data"]["upsertCharacter"]["id"]
  end

  test "upsert character with bad skill points returns error", %{
    conn: conn,
    access_token: access_token,
    character: character
  } do
    conn =
      conn
      |> put_req_header("authorization", "Bearer #{access_token}")
      |> post("/graphql", %{
        "query" => @upsert_character_mutation,
        "variables" => %{
          input: %{
            id: character.id,
            skin: character.skin,
            skill_points: character.skill_points,
            health: character.health + 10,
            defense: character.defense,
            magik: character.magik,
            attack: character.attack
          }
        }
      })

    res = json_response(conn, 200)

    assert "skill_points are you trying to cheat?" == (res["errors"] |> List.first())["message"]
  end

  test "upsert character not owned returns error", %{
    conn: conn,
    access_token: access_token,
    character_not_owned: character
  } do
    conn =
      conn
      |> put_req_header("authorization", "Bearer #{access_token}")
      |> post("/graphql", %{
        "query" => @upsert_character_mutation,
        "variables" => %{
          input: %{
            id: character.id,
            skin: character.skin,
            skill_points: character.skill_points,
            health: character.health,
            defense: character.defense,
            magik: character.magik,
            attack: character.attack
          }
        }
      })

    res = json_response(conn, 200)

    assert nil == res["data"]["upsertCharacter"]

    assert [
             %{
               "locations" => [%{"column" => 3, "line" => 2}],
               "message" => "are_you_cheating",
               "path" => ["upsertCharacter"]
             }
           ] == res["errors"]
  end
end
