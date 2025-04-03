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

dotenv.config();

const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Received request:', req.method, req.url);
//   console.log('Origin:', req.headers.origin);
//   next();
// });

// Enable CORS with explicit options
app.use((req, res, next) => {
  console.log(`🔹 Request: ${req.method} ${req.url}`);
  console.log(`🔹 Origin: ${req.headers.origin}`);
  console.log(`🔹 Headers:`, req.headers);
  next();
});

const corsOptions = {
  origin: ['*', 'http://localhost:3001'], // Frontend URL
  credentials: true, // Allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Ensure OPTIONS is included
  // allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma', 'auth_token'],
  // allowedHeaders: '*',

};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', educationRoutes);
app.use('/api/v1/', experienceRoutes)
app.use('/api/v1/', projectRoutes)
app.use('/api/v1/', portfolioRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(listEndpoints(app)); // Print available routes
})
