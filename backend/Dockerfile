# Use lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Expose backend port
EXPOSE 5000

# Start in development mode
CMD ["npm", "run", "dev"]
