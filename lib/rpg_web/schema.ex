defmodule RpgWeb.Schema do
  @moduledoc """
  The public schema module.
  """

  use Absinthe.Schema

  import_types(Rpg.Schema.AuthSchema)
  import_types(Rpg.Game.GameSchema)

  import_types(Absinthe.Type.Custom)

  query do
    import_fields(:auth_queries)
    import_fields(:game_queries)
  end

  mutation do
    import_fields(:auth_mutations)
    import_fields(:game_mutations)
  end
end
