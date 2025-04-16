FROM public.ecr.aws/nginx/nginx:1.27.4

# Convert to lowercase at build time
ARG FRONTEND_IMAGE
RUN echo "FRONTEND_IMAGE=${FRONTEND_IMAGE}" | tr '[:upper:]' '[:lower:]' > /tmp/frontend_image
RUN FRONTEND_IMAGE=$(cat /tmp/frontend_image) && \
    echo "Using frontend image: ${FRONTEND_IMAGE}" && \
    COPY --from=${FRONTEND_IMAGE} /app/build /var/www/app

# Rest of your configuration...
RUN rm -f /etc/nginx/conf.d/*.conf
COPY init-prod.sh /etc/nginx/init-prod.sh
COPY nginx-prod.conf /etc/nginx/nginx-prod.conf
RUN chmod +x /etc/nginx/init-prod.sh
EXPOSE 8904
