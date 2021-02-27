defmodule Rpg.Auth.Context do
  @moduledoc """
  The Context plug.
  """
  @behaviour Plug

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  @doc """
  Return the current user context based on the authorization header
  """
  def build_context(%Plug.Conn{} = conn) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        %{}

      user ->
        %{current_user: user}
    end
  end
end
