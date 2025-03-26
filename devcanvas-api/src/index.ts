import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import listEndpoints from 'express-list-endpoints';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', userRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(listEndpoints(app)); // Print available routes
})
