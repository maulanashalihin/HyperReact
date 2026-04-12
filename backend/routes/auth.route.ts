import type { Router, Request, Response } from 'hyper-express';
import { authService } from '../services/auth.service';

interface LoginBody {
  username: string;
  password: string;
}

interface RegisterBody {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export function setupAuthRoutes(router: Router): void {
  // POST /api/auth/login
  router.post('/login', async (req: Request, res: Response) => {
    try {
      const loginDto: LoginBody = await req.json();

      if (!loginDto.username || !loginDto.password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const result = await authService.login(loginDto);
      return res.json({
        message: 'Login successful',
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
          fullName: result.user.fullName,
        },
        token: result.token,
      });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  });

  // POST /api/auth/register
  router.post('/register', async (req: Request, res: Response) => {
    try {
      const registerDto: RegisterBody = await req.json();

      if (!registerDto.username || !registerDto.email || !registerDto.password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
      }

      const result = await authService.register(registerDto);
      return res.status(201).json({
        message: 'Registration successful',
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
          fullName: result.user.fullName,
        },
        token: result.token,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  });

  // GET /api/auth/me (protected)
  router.get('/me', async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;

      if (!token) {
        return res.status(401).json({ error: 'Token required' });
      }

      const user = await authService.validateToken(token);

      if (!user) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      return res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
        },
      });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  });
}
