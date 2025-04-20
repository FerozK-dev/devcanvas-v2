import { SwaggerDefinition, Options } from 'swagger-jsdoc';

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
      url: 'https://api.devcanvas.live/api/v1',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{
    bearerAuth: [],
  }],
};

const SwaggerOptions: Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    './src/routes/*.ts',
    './src/swagger/*.docs.ts'
  ],
};

export default SwaggerOptions;
