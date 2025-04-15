#!/usr/bin/env sh
set -eu

envsubst '${SERVER_UI_NAME} ${CSP_DOMAIN}' < /etc/nginx/nginx-prod.conf > /etc/nginx/nginx.conf
exec nginx -g 'daemon off;'
