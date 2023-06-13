# todo: create a .dockerignore file to avoid copying useless files to the container

# Use an official C++ base image
FROM gcc:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the source code to the container
COPY . /app

# Install dependencies (if any) using the package manager (e.g., apt-get, yum)
# Example: RUN apt-get update && apt-get install -y <package_name>
RUN apt-get update && apt-get install -y libcpprest-dev

# Build the C++ application
RUN g++ -Wall -o app src/app.cpp src/modules/config/config.cpp src/modules/database/database.cpp src/modules/api/api.cpp -lsqlite3 -lcpprest -lssl -lcrypto

# Expose the port on which the backend will listen
EXPOSE 8080

# Debug
RUN ls -la

# Set the command to run the backend
CMD ["./app"]