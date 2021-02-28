#!/bin/bash

rm -rf /opt/rpg 
mkdir -p /opt/rpg 
unzip /opt/scripts/rpg.zip -d /opt/
cp /opt/scripts/config.sh /opt/rpg/
cp /opt/scripts/start.sh /opt/rpg/
chown ubuntu:staff -R /opt/rpg/ 
chmod +x /opt/rpg/start.sh 
chmod +x /opt/rpg/config.sh
cp /opt/scripts/rpg.service /etc/systemd/system/rpg.service 
systemctl daemon-reload 
systemctl enable rpg.service