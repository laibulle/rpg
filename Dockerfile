FROM elixir:1.11

ENV ENVIRONMENT=prod

WORKDIR /opt/app
ADD . .

RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - 

RUN apt-get update && apt-get upgrade -y && apt-get install -y nodejs libxml2-dev libxslt-dev git libssl-dev \
    && mix local.rebar --force \
    && mix local.hex --force

RUN npm install -g expo-cli
RUN cd assets && npm install -g yarn && yarn install && yarn deploy

RUN MIX_ENV=prod mix do deps.get, deps.compile, compile
RUN MIX_ENV=prod mix phx.digest
RUN MIX_ENV=prod mix release

# Deployment stage
FROM debian

ENV ENVIRONMENT=prod

RUN apt-get update && apt-get install -y bash imagemagick libssl-dev

ENV REPLACE_OS_VARS=true

WORKDIR /opt/app/_build/
COPY --from=0 /opt/app/_build/prod/ .


CMD /bin/bash -c "./rel/rpg/bin/rpg eval 'Rpg.Release.migrate()' && ./rel/rpg/bin/rpg start"