defmodule Rpg.Release do
  @moduledoc """
  Release module
  """
  @app :rpg

  def reset do
    Application.ensure_all_started(@app)

    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &drop/1)
    end

    migrate()

    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &seed/1)
    end
  end

  def drop(repo) do
    Ecto.Adapters.SQL.query!(repo, "DO $$ DECLARE
    tabname RECORD;
BEGIN
    FOR tabname IN (SELECT tablename
                    FROM pg_tables
                    WHERE schemaname = current_schema())
LOOP
    EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(tabname.tablename) || ' CASCADE';
END LOOP;
END $$;")
  end

  def seed(_repo) do
    Application.ensure_all_started(@app)
    path = Application.app_dir(@app, "priv/repo/seeds.exs")

    if File.regular?(path) do
      Code.require_file(path)
    end
  end

  def migrate do
    Application.ensure_all_started(@app)

    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :up, all: true))
    end
  end

  def rollback(repo, version) do
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :down, to: version))
  end

  defp repos do
    Application.load(@app)
    Application.fetch_env!(@app, :ecto_repos)
  end
end
