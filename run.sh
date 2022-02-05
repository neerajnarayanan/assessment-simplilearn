#!/bin/bash
cd /home/ec2-user/simplilearndeplyment
docker-compose build --no-cache
docker-compose up -d
