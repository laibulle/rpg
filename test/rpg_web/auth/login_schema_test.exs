defmodule RpgWeb.LoginSchemaTest do
  use RpgWeb.ConnCase

  import Rpg.TestConn
  import Rpg.Fixtures

  @login_mutation """
  mutation Login($input: AuthInput!) {
    auth(input: $input) {
      accessToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
  """

  setup do
    checkout()
    user = user_fixture()
    [user: user]
  end

  test "mutation: login invalid user returns error", %{conn: conn} do
    conn =
      post(conn, "/graphql", %{
        "query" => @login_mutation,
        "variables" => %{input: %{email: "johndoe@rpg.io", password: "P@ssw0rd"}}
      })

    assert json_response(conn, 200) == %{
             "errors" => [
               %{
                 "locations" => [%{"column" => 3, "line" => 2}],
                 "message" => "bad_credentials",
                 "path" => ["auth"]
               }
             ],
             "data" => %{"auth" => nil}
           }
  end

  test "mutation: login valid user returns user, token and refresh token", %{
    conn: conn,
    user: user
  } do
    conn =
      post(conn, "/graphql", %{
        "query" => @login_mutation,
        "variables" => %{input: %{email: user.email, password: "P@ssw0rd"}}
      })

    %{
      "data" => %{
        "auth" => %{
          "accessToken" => _accessToken,
          "refreshToken" => _refreshToken,
          "user" => %{"email" => "janedoe@rpg.io", "id" => _id}
        }
      }
    } = json_response(conn, 200)
  end
end
