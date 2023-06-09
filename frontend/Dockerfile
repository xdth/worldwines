# Use an official Node.js base image with a specified version
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the source code to the container
COPY . .

# Build the React.js application
RUN npm run build

# Expose the port on which the frontend will run
EXPOSE 3000

# Set the command to run the frontend
CMD ["npm", "start"]
