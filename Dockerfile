# Dockerfile for SvelteKit
# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run the application
CMD ["node", "build"]

