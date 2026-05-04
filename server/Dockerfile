FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# The backend port was changed to 5001 in docker-compose.yml
EXPOSE 5001

CMD ["npm", "start"]
