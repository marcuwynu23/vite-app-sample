ARG NODE_VERSION=18
# Base stage
FROM node:$NODE_VERSION as base
WORKDIR /app
RUN apk upgrade --no-cache

# Build stage
FROM base as builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

ARG NGINX_VERSION=stable
# Development stage
FROM nginx:$NGINX_VERSION as development
RUN apk upgrade --no-cache
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Ensure nginx runtime directories exist
RUN mkdir -p /var/cache/nginx/client_temp /var/run/nginx \
    && chown -R nginx:nginx /var/cache/nginx /var/run/nginx /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Production stage
FROM nginx:$NGINX_VERSION as production
RUN apk upgrade --no-cache
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Ensure nginx runtime directories exist
RUN mkdir -p /var/cache/nginx/client_temp /var/run/nginx \
    && chown -R nginx:nginx /var/cache/nginx /var/run/nginx /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]