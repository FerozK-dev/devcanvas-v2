FROM public.ecr.aws/nginx/nginx:1.27.4

ARG FRONTEND_IMAGE=ghcr.io/ferozk-dev/devcanvas_v2-frontend:latest

# Remove default configs
RUN rm -f /etc/nginx/conf.d/*.conf

# Copy initialization script and config
COPY init-prod.sh /etc/nginx/init-prod.sh
COPY nginx-prod.conf /etc/nginx/nginx-prod.conf

# Copy built frontend assets
COPY --from=${FRONTEND_IMAGE} /app/build /var/www/app

# Set executable permissions
RUN chmod +x /etc/nginx/init-prod.sh

EXPOSE 8904