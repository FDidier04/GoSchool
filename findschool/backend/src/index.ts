import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { db } from './db/connection';
import { seedDatabase } from './db/seed';
import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './routes/auth';
import { schoolRoutes } from './routes/schools';
import { courseRoutes } from './routes/courses';
import { userRoutes } from './routes/users';
import { bookingRoutes } from './routes/bookings';
import { reviewRoutes } from './routes/reviews';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Documentation route
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: 'GoSchool API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      schools: '/api/schools',
      courses: '/api/courses',
      bookings: '/api/bookings',
      reviews: '/api/reviews',
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    path: req.path,
  });
});

// Error handler
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Test database connection
    await db.one('SELECT 1');
    console.log('âœ“ Database connection successful');

    // Seed database with sample data
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`ðŸš€ Server running on http://localhost:${PORT}`);
      console.log(`ðŸ“ Environment: ${process.env.NODE_ENV}`);
      console.log(`ðŸ“š API Documentation: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('âœ— Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
