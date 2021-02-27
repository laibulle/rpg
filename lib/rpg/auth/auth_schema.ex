defmodule Rpg.Schema.AuthSchema do
  @moduledoc """
  AuthSchema module
  """
  use Absinthe.Schema.Notation
  alias Rpg.Resolvers

  object :token_res do
    field(:refresh_token, non_null(:string))
    field(:access_token, non_null(:string))
  end

  input_object :register_input do
    field(:name, non_null(:string))
    field(:password, non_null(:string))
    field(:email, non_null(:string))
  end

  input_object :register_coach_input do
    field(:name, non_null(:string))
    field(:password, non_null(:string))
    field(:email, non_null(:string))
  end

  input_object :user_input do
    field(:name, non_null(:string))
    field(:password, non_null(:string))
    field(:email, non_null(:string))
  end

  object :me_res do
    field(:user, non_null(:user))
  end

  input_object :auth_input do
    field(:email, non_null(:string))
    field(:password, non_null(:string))
  end

  object :login_res do
    field(:access_token, non_null(:string))
    field(:refresh_token, non_null(:string))
    field(:user, non_null(:user))
  end

  object :user do
    field(:id, non_null(:id))
    field(:email, non_null(:string))
    field(:name, non_null(:string))
    field(:enabled, non_null(:boolean))
    field(:code, :string)
    field(:balance, non_null(:integer))
  end

  object :auth_queries do
  end

  object :auth_mutations do
    @desc "Login"
    field :auth, :login_res do
      arg(:input, non_null(:auth_input))
      resolve(&Resolvers.Auth.auth/3)
    end

    @desc "Refresh token"
    field :token, :token_res do
      arg(:refresh_token, non_null(:string))
      resolve(&Resolvers.Auth.token/3)
    end

    @desc "Create a user"
    field :register, :user do
      arg(:input, :register_input)
      resolve(&Resolvers.Auth.create_user/3)
    end
  end
end
