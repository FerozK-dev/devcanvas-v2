# Introduction
This site is a personalized portfolio builder targeted at web developers and software industry professionals. Users can sign up on the platform and start building their own portfolio. The site provides option to publish the portfolio which makes it publicly available.

# Production
The app is running at https://app.devcanvas.live.

## Usage
Usage instructions:
- Open the deployed link for the project.
- Go to signup page from the navbar.
- Provide your details and sign up on the app.
- If not already logged in, log in using your credentials and you will be taken to the My portfolio page. Here you can edit various sections separately.
- Edit your profile, education, experience, and portfolio section accordingly. 
- Once you are done with setting up your portfolio and are satisfied with how it looks, click the Publish portfolio button under the profile section to publish your portfolio. Publishing will open a new tab with the published version of your portfolio. You will notice that this version will not have any buttons to edit or add details. This version is publicly accessible and you can copy the link to share with your contacts.
- If you decide to unpublish, simply click the Unpublish portfolio button on My portfolio- your portfolio will be automatically unpublished and the link will not show your portfolio publicly.

## API documentation
Swagger documentation is available for the backend API here https://backend.devcanvas.live/api-docs/. Be sure to select the `Production server` from the `Servers` select.
AI service is not covered with swagger.

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

6. Swagger is available at https://backend.localhost/api-docs/. Be sure to select the `Local server with traefik` from the `Servers` select.
