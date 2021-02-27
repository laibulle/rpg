defmodule Rpg.Graphql.ErrorHelper do
  @moduledoc """
  The error helper module.
  """

  def format({:ok, res}), do: {:ok, res}

  def format({:error, %Ecto.Changeset{} = changeset}) do
    errors =
      changeset.errors
      |> Enum.map(fn {key, {value, context}} ->
        details =
          context
          |> Enum.map(fn {a, b} ->
            %{"#{a}": b}
          end)

        [message: "#{key} #{value}", details: details]
      end)

    {:error, errors}
  end

  def format({:error, res}), do: {:error, res}
end
