FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default Nginx configuration with one that supports client-side routing
RUN echo $'server { \\\n\
    listen 80; \\\n\
    server_name localhost; \\\n\
    location / { \\\n\
        root /usr/share/nginx/html; \\\n\
        index index.html index.htm; \\\n\
        try_files $uri $uri/ /index.html; \\\n\
    } \\\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
