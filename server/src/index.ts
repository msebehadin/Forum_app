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
const allowedOrigins = (process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : [process.env.BASE_URL || "http://localhost:3000"]
).filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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


const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
