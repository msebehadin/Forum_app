import express from 'express';
import dotenv from 'dotenv';
import { prisma } from './config/db';
import authRoutes from './modules/auth/auth.routes'
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.json({ message: 'API running' }));


// Connect to the database
(async () => {
  try {
    await prisma.$connect();
    console.log('database connected');
  } catch (error) {
    console.error('DB connection failed', error);
  }
})();
app.use('/api/auth',authRoutes)

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'disconnected', error: err });
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log('server running on port', process.env.PORT || 4000)
);
