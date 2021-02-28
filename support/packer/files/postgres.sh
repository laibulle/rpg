#!/bin/bash

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - 
echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" | tee  /etc/apt/sources.list.d/pgdg.list 
apt-get update
apt-get install -y postgresql-13 postgresql-client-13
sudo -u postgres psql -c "CREATE USER rpg_production WITH PASSWORD 'xxxxxxx';"
sudo -u postgres psql -c "create database rpg_production;"
sudo -u postgres psql -c "grant all privileges on database rpg_production to rpg_production;"
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/13/main/postgresql.conf