FROM public.ecr.aws/nginx/nginx:1.27.4

ARG FRONTEND_TAG=latest
ARG FRONTEND_IMAGE=ghcr.io/ferozk-dev/devcanvas_v2-devcanvas-frontend

# Convert to lowercase explicitly
COPY --from=${FRONTEND_IMAGE}:${FRONTEND_TAG} /build /var/www/app

# Rest of your Nginx configuration
RUN rm -f /etc/nginx/conf.d/*.conf
COPY nginx-prod.conf /etc/nginx/nginx-prod.conf
COPY init-prod.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/init-prod.sh
EXPOSE 8904