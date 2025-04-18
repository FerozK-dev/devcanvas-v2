# Running locally
1. Download repo or clone `git clone git@github.com:FerozK-dev/devcanvas-v2.git` 
2. Add two `.env` files with variables.
First, `devcanvas-api/.env`
```
# devcanvas-api/.env

DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}?schema=public"
JWT_SECRET=put_your_secret  # Can put any string here
STORAGE_TYPE=cloud
 
# Cloudinary Config (Only needed if using cloud)
CLOUDINARY_CLOUD_NAME=cloud_name  # Any string
CLOUDINARY_API_KEY=api_key  # Any string
CLOUDINARY_API_SECRET=api_secret  # Any string
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name  # Same as above
```

Then, `.env` in root
```
# root/.env

DB_USER=postgres  # Can change if you want
DB_PASSWORD=12345678  # Can change if you want
DB_NAME=devcanvas-dev-db  # Can change if you want
 
DATABASE_URL=postgres://postgres:12345678@localhost:5432/devcanvas-dev-db?schema=public&connection_limit=1  # Same as above
```

3. Generate trusted certificates and move them to traefik/certs folder, following [Japskua/cloud_services_and_infra_2025](https://github.com/Japskua/cloud_services_and_infra_2025/blob/main/certificates.md).
You will need the following:
```
mkcert "*.localhost" traefik.localhost frontend.localhost backend.localhost postgres.localhost
```

For the step "Use the Certificate in Your Server", use only Traefik code. You don't need to add code to Node.js or Nginx.

4. Build and compose up
```
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```

5. The app is available at `https://frontend.localhost/`
