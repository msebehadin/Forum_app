import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { prisma } from './config/db';
import authRoutes from './modules/auth/auth.routes';
import questionRoute from './modules/question/question.routes'
import answerRoute from './modules/answer/answer.route'
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin:process.env.BASE_URL,
  credentials: true 
}));

app.get('/', (_req, res) => res.json({ message: 'API running' }));

// Connect to the database
(async () => {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (error) {
    console.error('DB connection failed', error);
  }
})();

app.use('/api/auth', authRoutes);
app.use('/api/question',questionRoute)
app.use('/api/answer',answerRoute)
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'disconnected', error: err });
  }
});


const PORT = process.env.PORT | 4000|;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


