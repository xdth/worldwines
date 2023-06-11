#!/bin/bash

docker stop wines_backend
docker rm wines_backend
docker rmi wines_backend
docker build -t wines_backend .
# docker run --name wines_backend -dp 8080:8080 wines_backend # detached
docker run -it --name wines_backend -p 8080:8080 wines_backend