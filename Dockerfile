# Stage 1: Build the Vite app
FROM node:alpine3.22 AS builder

WORKDIR /app

RUN apk upgrade --no-cache

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

RUN apk upgrade --no-cache

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ensure nginx runtime directories exist
RUN mkdir -p /var/cache/nginx/client_temp /var/run/nginx \
    && chown -R nginx:nginx /var/cache/nginx /var/run/nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]