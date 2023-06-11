#!/bin/bash

# Compile
g++ -Wall -o app src/app.cpp src/modules/config/config.cpp src/modules/database/database.cpp src/modules/api/api.cpp -lsqlite3 -lcpprest -lssl -lcrypto

# Compile - debugger
# g++ -g -Wall -o app src/app.cpp src/modules/config/config.cpp src/modules/database/database.cpp src/modules/api/api.cpp -lsqlite3 -lcpprest -lssl -lcrypto

# Run the program
./app

# Run the program - debugger
# gdb ./app # debugger