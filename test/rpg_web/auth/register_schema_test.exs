defmodule RpgWeb.RegisterSchemaTest do
  use RpgWeb.ConnCase

  import Rpg.TestConn
  import Rpg.Fixtures
  alias Rpg.Auth

  @register_mutation """
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      enabled
    }
  }
  """

  setup do
    checkout()
    user = user_fixture()
    [user: user]
  end

  test "mutation: create user and active it with authentication code", %{conn: conn} do
    res =
      post(conn, "/graphql", %{
        "query" => @register_mutation,
        "variables" => %{input: %{email: "anyuser@rpg.io", name: "Mr new", password: "P@ssw0rd"}}
      })
      |> json_response(200)

    assert false == res["data"]["register"]["enabled"]

    code = Auth.list_activation_codes_by_user(res["data"]["register"]["id"]) |> List.first()

    assert %{"message" => "user enabled"} ==
             get(conn, "/api/v1/users/activate/#{code.code}")
             |> json_response(200)
  end

  test "mutation: trying to create a user that already exists returns an error", %{
    conn: conn,
    user: user
  } do
    conn =
      post(conn, "/graphql", %{
        "query" => @register_mutation,
        "variables" => %{input: %{email: user.email, name: "Mr new", password: "P@ssw0rd"}}
      })

    assert json_response(conn, 200) == %{
             "errors" => [
               %{
                 "details" => [
                   %{"constraint" => "unique"},
                   %{"constraint_name" => "users_email_index"}
                 ],
                 "locations" => [%{"column" => 3, "line" => 2}],
                 "message" => "users has already been taken",
                 "path" => ["register"]
               }
             ],
             "data" => %{"register" => nil}
           }
  end
end
