FROM node:18-alpine

# Install git for repository operations
RUN apk add --no-cache git

# Set working directory
WORKDIR /action

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy action code
COPY . .

# Make the entrypoint executable
RUN chmod +x /action/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/action/entrypoint.sh"]
