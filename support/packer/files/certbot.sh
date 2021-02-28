#!/bin/bash

# configuration for cloudflare
#export AWS_ACCESS_KEY_ID=xxxxxx
#export AWS_SECRET_ACCESS_KEY=xxxxxxx
#export AWS_DEFAULT_REGION=xxxxxxx

#CLOUDFLARE_EMAIL=xxxxxxx
#CLOUDFLARE_API_KEY="xxxxxxxxxxxxxxxx
#DOMAIN="rpg.laibulle.dev"

mkdir -p /etc/letsencrypt/live/rpg.laibulle.dev/
aws s3 cp s3://trenr-production-eu-west-3/letsencrypt/live/rpg.laibulle.dev/ /etc/letsencrypt/live/rpg.laibulle.dev/ --recursive

# as root configure your cloudflare secrets
mkdir -p /root/.secrets
cat <<CLOUDFLARE_CONFIG > /root/.secrets/cloudflare.ini
dns_cloudflare_email="$CLOUDFLARE_EMAIL"
dns_cloudflare_api_key="$CLOUDFLARE_API_KEY"
CLOUDFLARE_CONFIG
 
# make sure they are hidden, the api key is more powerful than a password!
chmod 0700 ~/.secrets/
chmod 0400 ~/.secrets/cloudflare.ini
 
# install pip, upgrade, then install the cloudflare/certbot tool
apt-get install -y python3-pip awscli
#pip3 install --upgrade pip
pip3 install certbot-dns-cloudflare
 
# generate a wildcard cert for the domain using a dns challenge
#
# --quiet, suppress output
# --non-interactive, avoid user input
# --agree-tos, agree to tos on first run
# --keep-until-expiring, keep existing certs
# --preferred-challenges, specify to use dns-01 challenge
# --dns-cloudflare, use the cloudflare dns plugin
# --dns-cloudflare-credentials, path to ini config
# -d, domains to generate keys for, you can add additional ones if needed
certbot certonly \
  --quiet \
  --agree-tos \
  --email $CLOUDFLARE_EMAIL \
  --non-interactive \
  --keep-until-expiring \
  --preferred-challenges dns-01 \
  --dns-cloudflare \
  --dns-cloudflare-credentials /root/.secrets/cloudflare.ini \
  -d $DOMAIN,*.$DOMAIN

aws s3 cp /etc/letsencrypt/live/$DOMAIN/  s3://rpg-production-eu-west-3/letsencrypt/live/$DOMAIN/ --recursive
