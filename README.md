# Running locally
1. Download repo or clone `git clone git@github.com:FerozK-dev/devcanvas-v2.git` 
2. Add an `.env` files with variables following the `.env.example`.
You will need Cloudinary api key to save pictures and files. You can get the credentials by creating an account in [Cloudinary](https://cloudinary.com/documentation/developer_onboarding_faq_find_credentials).

To work with AI service, you will need a `GOOGLE_API_KEY`. You can use yours if you have one, or contact the contributors to get one.


3. Generate trusted certificates and move them to traefik/certs folder, following [Japskua/cloud_services_and_infra_2025](https://github.com/Japskua/cloud_services_and_infra_2025/blob/main/certificates.md).
You will need the following:
```
mkcert "*.localhost" traefik.localhost frontend.localhost backend.localhost ai.localhost postgres.localhost
```

For the step "Use the Certificate in Your Server", use only Traefik code. You don't need to add code to Node.js or Nginx.

4. Build and compose up
```
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```

5. The app is available at `https://frontend.localhost/`
