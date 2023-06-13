#!/bin/bash

docker stop wines_frontend
docker rm wines_frontend
docker rmi wines_frontend
docker build -t wines_frontend .
# docker run --name wines_frontend -dp 5000:5000 wines_frontend # detached
docker run -it --name wines_frontend -p 5000:5000 wines_frontend