# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source
COPY backend/ ./

# Expose the port
EXPOSE 5000

# Start the API server
CMD ["node", "server.js"]
