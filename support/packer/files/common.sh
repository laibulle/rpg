#!/bin/bash

ufw allow 22/tcp

apt-add-repository universe
# Add the New Relic Infrastructure Agent gpg key \
curl -s https://download.newrelic.com/infrastructure_agent/gpg/newrelic-infra.gpg | apt-key add - 
echo "license_key: xxxxxxxx" | tee -a /etc/newrelic-infra.yml
printf "deb [arch=amd64] https://download.newrelic.com/infrastructure_agent/linux/apt focal main" | tee -a /etc/apt/sources.list.d/newrelic-infra.list
apt-get update
apt-get upgrade -y
apt-get install -y zip zsh vim bash-completion wget newrelic-infra
cp /opt/scripts/motd /etc/motd
cp /opt/scripts/logs.yml /etc/newrelic-infra/logging.d/
systemctl restart newrelic-infra