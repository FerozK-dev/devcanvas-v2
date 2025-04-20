import { SwaggerDefinition, Options } from 'swagger-jsdoc';
import path from 'path';


const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DevCanvas API Documentation',
    version:  '1.0.0',
    description: 'API documentation with Swagger',
    contact: {
      name: 'Feroz',
      email: 'ferozkhan.deve@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development server',
    },
    {
      url: 'https://backend.devcanvas.live/api/v1',
      description: 'Production server',
    },
    {
      url: 'https://backend.localhost/api/v1',
      description: 'Local server with traefik',
    },
  ],
  components: {
    // securitySchemes: {
    //   bearerAuth: {
    //     type: 'http',
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //   },
    // },
    customAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'auth_token',
      description: 'Custom authentication token'
    }
  },
  security: [{
    bearerAuth: [],
  }],
};

const SwaggerOptions: Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, '../swagger/*.docs.js') // dist/swagger in prod
      : path.resolve(__dirname, '../../src/swagger/*.docs.ts') // src/swagger in dev
  ],
};

export default SwaggerOptions;
