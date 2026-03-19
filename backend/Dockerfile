# Use Node.js LTS version as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies (using clean install for reliable, reproducible builds)
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the port your server listens on (default 5001 from server.js)
EXPOSE 5001

# Set the node environment
ENV NODE_ENV=production

# Start the backend server
CMD ["npm", "start"]