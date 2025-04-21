import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import educationRoutes from './routes/educationRoutes'
import experienceRoutes from './routes/experienceRoutes'
import projectRoutes from './routes/projectRoutes'
import portfolioRoutes from './routes/portfolioRoutes'
import listEndpoints from 'express-list-endpoints';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './utils/swagger';
// import type { CorsOptions } from 'cors';

dotenv.config();

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frontendUrls = [
  'http://localhost:3001',         // Local dev
  'https://frontend.localhost',    // Docker/Traefik
  'https://app.devcanvas.live',     // Production
  'https://devcanvas.live'
];

const corsOptions = {
  origin: frontendUrls, // Frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',
    'Expires',
    'Pragma',
    'auth_token'
  ],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests


app.use((req, res, next) => {
  console.log(`🔹 Request: ${req.method} ${req.url}`);
  console.log(`🔹 Origin: ${req.headers.origin}`);
  console.log(`🔹 Headers:`, req.headers);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`🔹 Body:`, JSON.stringify(req.body, null, 2));
  } else {
    console.log(`🔹 Body: [No body or empty]`);
  }

  next();
});

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', educationRoutes);
app.use('/api/v1/', experienceRoutes);
app.use('/api/v1/', projectRoutes);
app.use('/api/v1/', portfolioRoutes);
app.use('/storage', express.static(path.join(__dirname, 'public/storage')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(listEndpoints(app)); // Print available routes
});
