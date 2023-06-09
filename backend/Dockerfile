# Use an official C++ base image
FROM gcc:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the source code to the container
COPY . /app

# Install dependencies (if any) using the package manager (e.g., apt-get, yum)
# Example: RUN apt-get update && apt-get install -y <package_name>

# Build the C++ application
RUN g++ -o backend main.cpp

# Expose the port on which the backend will listen
EXPOSE 8080

# Set the command to run the backend
CMD ["./backend"]