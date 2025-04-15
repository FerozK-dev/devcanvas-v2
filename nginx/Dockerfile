
FROM public.ecr.aws/nginx/nginx:1.27.4

# Remove default config
RUN rm -f /etc/nginx/conf.d/*.conf

# Copy custom configurations
COPY nginx-prod.conf /etc/nginx/nginx-prod.conf
COPY init-prod.sh /docker-entrypoint.d/

# Add frontend build
COPY --from=ghcr.io/ferozk-dev/devcanvas_v2-devcanvas-frontend:latest /app/build /var/www/app

# Ensure script is executable
RUN chmod +x /docker-entrypoint.d/init-prod.sh

# Nginx runs on port 8904
EXPOSE 8904
