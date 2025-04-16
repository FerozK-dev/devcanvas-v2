FROM public.ecr.aws/nginx/nginx:1.27.4

# Remove default configs
RUN rm -f /etc/nginx/conf.d/*.conf

# Copy initialization script and config
COPY init-prod.sh /etc/nginx/init-prod.sh
COPY nginx-prod.conf /etc/nginx/nginx-prod.conf

# The frontend assets will be copied in the build command
COPY ./build /var/www/app

# Set executable permissions
RUN chmod +x /etc/nginx/init-prod.sh

EXPOSE 8904
