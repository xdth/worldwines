#!/bin/bash

# Compile
g++ -Wall -o app src/app.cpp src/modules/config/config.cpp src/modules/database/database.cpp src/modules/api/api.cpp -lsqlite3 -lcpprest -lssl -lcrypto

# Compile - debugger
# g++ -g -Wall -o app src/app.cpp src/modules/config/config.cpp src/modules/database/database.cpp src/modules/api/api.cpp -lsqlite3 -lcpprest -lssl -lcrypto

# Run the program
./app

# Run the program - debugger
# gdb ./app # debugger




# Future options
# docker build -t wines_backend . && docker run --name wines_backend -dp 8080:8080 wines_backend # detached
# docker build -t wines_backend . && docker run --name wines_backend -p 8080:8080 wines_backend
# docker rm wines_backend && docker rmi wines_backend