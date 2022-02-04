#!/bin/bash
cd /home/ec2-user/deployment
docker-compose build --no-cache
docker-compose up -d