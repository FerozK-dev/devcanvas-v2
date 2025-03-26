import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import educationRoutes from './routes/educationRoutes'
import experienceRoutes from './routes/experienceRoutes'
import projectRoutes from './routes/projectRoutes'
import listEndpoints from 'express-list-endpoints';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', educationRoutes);
app.use('/api/v1/', experienceRoutes)
app.use('/api/v1/', projectRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(listEndpoints(app)); // Print available routes
})
