FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Assume the backend listens on PORT environment variable, defaults to 5000 if needed
EXPOSE 5000

CMD ["npm", "start"]
