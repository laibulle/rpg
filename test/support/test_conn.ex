defmodule Rpg.TestConn do
  alias Rpg.Repo

  def checkout(_context \\ nil) do
    Ecto.Adapters.SQL.Sandbox.checkout(Repo)
  end
end
