import 'dotenv/config';
import HyperExpress from 'hyper-express';
import { initializeDatabase } from './config/database';
import { setupAuthRoutes } from './routes/auth.route';
import { setupUsersRoutes } from './routes/users.route';
import { env, validateEnv } from './config/env';

// CORS Middleware
function corsMiddleware(req: HyperExpress.Request, res: HyperExpress.Response, next: () => void): void {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(204).send();
    return;
  }
  
  next();
}

async function bootstrap(): Promise<void> {
  try {
    // Validate environment variables
    validateEnv();

    // Initialize database
    await initializeDatabase();

    // Create HyperExpress server
    const server = new HyperExpress.Server();

    // Global middleware
    server.use(corsMiddleware);

    // Request logging
    server.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });

    // Health check endpoint
    server.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // API Routes
    const apiRouter = new HyperExpress.Router();
    setupAuthRoutes(apiRouter);
    server.use('/api/auth', apiRouter);

    const usersRouter = new HyperExpress.Router();
    setupUsersRoutes(usersRouter);
    server.use('/api/users', usersRouter);

    // Start server
    await server.listen(env.PORT);
    console.log(`🚀 Server is running on http://localhost:${env.PORT}`);
    console.log(`   Environment: ${env.NODE_ENV}`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

export default bootstrap;
