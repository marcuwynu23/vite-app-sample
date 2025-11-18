# Stage 1: Build the Vite app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Debug: List build output (optional)
RUN ls -la /app/dist

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default Nginx config and add custom one
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 80 for Coolify
EXPOSE 80

# Use non-root user for security (optional)
USER nginx

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
