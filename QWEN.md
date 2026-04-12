# React SPA with HyperExpress - Project Context

## Project Overview

A full-stack React application with a **separate backend API** architecture:

- **Frontend**: React Router v7 + Vite + TailwindCSS (SPA, deployed to static hosting)
- **Backend**: HyperExpress + TypeORM + SQLite (Node.js API server)

This project uses a **decoupled architecture** where frontend and backend run on different ports during development, and the frontend is deployed to static hosting in production while the backend runs as a separate API service.

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React Router | v7.14.0 | Routing, SSR, data loading |
| React | v19.2.4 | UI framework |
| Vite | v8.0.3 | Build tool, dev server |
| TailwindCSS | v4.2.2 | Styling |
| TypeScript | v5.9.3 | Type safety |
| Lucide React | v1.8.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| HyperExpress | v6.17.3 | Web framework (high-performance) |
| TypeORM | v0.3.28 | ORM |
| better-sqlite3 | v12.8.0 | SQLite database driver |
| bcrypt | v6.0.0 | Password hashing |
| jsonwebtoken | v9.0.3 | JWT authentication |

---

## Project Structure

```
react-spa-with-hyper-express/
├── app/                          # Frontend React application
│   ├── components/
│   │   ├── layout/
│   │   │   └── header.tsx        # Global header with navigation & theme toggle
│   │   └── ui/
│   │       ├── button.tsx        # Custom Button (gradient variants)
│   │       ├── input.tsx         # Input with icon support
│   │       ├── card.tsx          # Card with Header/Content/Footer
│   │       ├── badge.tsx         # Status badges
│   │       ├── avatar.tsx        # User avatar with gradient fallback
│   │       └── toast.tsx         # Custom toast notifications
│   ├── contexts/
│   │   ├── auth.context.tsx      # Auth state provider
│   │   └── theme.context.tsx     # Dark/light mode provider
│   ├── hooks/
│   │   ├── use-auth.ts           # Auth hook (exports from context)
│   │   └── use-toast.ts          # Toast hook (exports from toast component)
│   ├── lib/
│   │   ├── api.ts                # Fetch API client
│   │   ├── types.ts              # TypeScript types
│   │   └── utils.ts              # Utility functions (cn helper)
│   ├── routes/
│   │   ├── _index.tsx            # Home page (/)
│   │   ├── auth/
│   │   │   ├── login.tsx         # Login page (/auth/login)
│   │   │   └── register.tsx      # Register page (/auth/register)
│   │   └── dashboard/
│   │       ├── _index.tsx        # Dashboard (/dashboard)
│   │       └── users.tsx         # Users management (/dashboard/users)
│   ├── app.css                   # TailwindCSS + custom animations
│   ├── root.tsx                  # Root layout with providers
│   └── routes.ts                 # Route configuration
│
├── backend/                      # Backend API server
│   ├── config/
│   │   ├── database.ts           # TypeORM DataSource
│   │   └── env.ts                # Environment config
│   ├── dto/
│   │   ├── login.dto.ts          # Login request type
│   │   └── register.dto.ts       # Register request type
│   ├── entities/
│   │   └── user.entity.ts        # User entity (EntitySchema)
│   ├── middleware/
│   │   ├── auth.middleware.ts    # JWT validation
│   │   └── error.middleware.ts   # Global error handler
│   ├── routes/
│   │   ├── auth.route.ts         # /api/auth/* endpoints
│   │   └── users.route.ts        # /api/users/* endpoints
│   ├── services/
│   │   ├── auth.service.ts       # Auth business logic
│   │   └── users.service.ts      # Users CRUD logic
│   ├── migrations/               # TypeORM migrations
│   ├── .env                      # Environment variables
│   ├── .env.example
│   ├── index.ts                  # HyperExpress entry point
│   └── database.sqlite           # SQLite database file
│
├── public/                       # Static assets
├── .env                          # Frontend env (VITE_API_URL)
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── react-router.config.ts
```

---

## Building and Running

### Development

```bash
# Install dependencies
npm install

# Run both frontend and backend concurrently
npm run dev
```

This starts:
- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend**: `http://localhost:3001` (HyperExpress API)

### Separate Commands

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Production

```bash
# Build frontend for production
npm run build

# Start production server (React Router serve)
npm run start
```

### Type Checking

```bash
npm run typecheck
```

---

## Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:3001
```

### Backend (`backend/.env`)
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
DATABASE_PATH=database.sqlite
```

---

## API Endpoints

### Authentication (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |

### Users (Protected - requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Utility
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |

---

## Authentication Flow

1. **Register**: `POST /api/auth/register` → returns `{ user, token }`
2. **Login**: `POST /api/auth/login` → returns `{ user, token }`
3. **Token Storage**: Frontend stores token in `localStorage`
4. **Protected Requests**: Token sent via `Authorization: Bearer <token>` header
5. **Token Validation**: Backend validates JWT using `authMiddleware`
6. **Auto-redirect**: Frontend redirects to `/auth/login` on 401

---

## Key Implementation Details

### Frontend API Client (`app/lib/api.ts`)
- Uses **native Fetch API** (no axios)
- Request interceptor adds JWT token from localStorage
- Response interceptor handles 401 only for protected routes (not auth endpoints)
- Login/register errors are returned to component for toast display

### Custom UI Components
- **Button**: Gradient variants (primary, secondary, outline, ghost, danger), isLoading support
- **Input**: Icon support (left position), label, error states
- **Card**: Composed components (Card, CardHeader, CardTitle, CardContent, CardFooter)
- **Badge**: Variants (default, success, warning, error, info)
- **Avatar**: Gradient fallback with user initials
- **Toast**: Custom toast notifications (bottom-right position, auto-dismiss 5s, icons)

### Theme System
- **Dark/Light mode**: Toggle via header button, persists to localStorage
- **System preference**: Respects OS theme setting when set to 'system'
- **Context-based**: ThemeProvider wraps entire app

### Backend Middleware (HyperExpress)
- **CORS**: Allows all localhost ports in development, configured for production origin
- **JSON parsing**: Uses native `req.json()` method (no middleware)
- **Error handling**: Global error middleware catches and formats errors
- **Important**: Middleware must use `next()` callback pattern per HyperExpress docs

### Backend Body Parsing
- Uses **native `req.json()`** method in route handlers (not middleware)
- More performant than middleware approach
- Only parses JSON when needed

### CORS
- Backend allows all `http://localhost:*` ports in development
- Handles preflight OPTIONS requests
- Required for frontend-backend communication

### Database
- SQLite via better-sqlite3
- TypeORM with `synchronize: true` in development
- Uses `EntitySchema` (not decorators) for ESM compatibility

---

## Development Conventions

### Code Style
- **TypeScript**: Strict mode enabled
- **Module System**: ES modules (`"type": "module"`)
- **Import Alias**: `~/*` maps to `./app/*`

### Testing
- No test framework configured yet
- Manual testing via curl/browser

### Git
- `.gitignore` excludes: `node_modules/`, `.env`, `build/`, `.react-router/`, `*.sqlite`

---

## Common Tasks

### Add a New API Endpoint
1. Add route handler in `backend/routes/*.route.ts`
2. Add service method in `backend/services/*.service.ts` if needed
3. Update frontend API client in `app/lib/api.ts`
4. Add toast notifications for success/error states

### Add a New UI Component
1. Create component in `app/components/ui/`
2. Use TailwindCSS for styling with dark mode support (`dark:` variants)
3. Export from component file
4. Import in pages as needed

### Add Toast Notifications
```tsx
import { useToast } from '@/components/ui/toast';

export default function MyComponent() {
  const { success, error } = useToast();
  
  const handleSubmit = async () => {
    try {
      await apiCall();
      success({ title: 'Success!', description: 'Operation completed' });
    } catch (err) {
      error({ title: 'Failed', description: err.message });
    }
  };
}
```

### Database Changes
1. Modify entity in `backend/entities/user.entity.ts`
2. Create migration (TypeORM migrations)
3. Run migration
4. Or use `npm run refresh` to reset database (development only)

### Theme/Dark Mode
- Toggle via header button or programmatically via `useTheme()` hook
- Theme persists to localStorage
- Respects system preference when set to 'system'

---

## Troubleshooting

### Login/Register Not Working (Infinite Loading)
- **Check backend is running**: `curl http://localhost:3001/health`
- **Check CORS**: Backend must allow frontend origin (all localhost ports allowed in dev)
- **Check password hashing**: bcrypt compare must work with stored hash
- **Test with curl**: `curl -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d '{"username":"test","password":"test"}'`

### Toast Notifications Not Showing
- **Ensure ToastProvider wraps app**: Check `app/root.tsx` has `<ToastProvider>`
- **Import useToast from correct path**: `import { useToast } from '@/components/ui/toast'`
- **Hard refresh browser**: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Backend Changes Not Reflecting
- **Backend has no hot reload**: Must restart manually after code changes
- **Kill and restart**: `lsof -ti:3001 | xargs kill -9` then `cd backend && npx tsx index.ts`
- **Or use npm script**: `npm run dev:backend`

### Database Reset
- **Delete and re-migrate**: `npm run refresh` (deletes `backend/database.sqlite`)
- **Restart backend**: TypeORM auto-creates tables on startup (`synchronize: true`)

### CORS Errors
- Ensure backend CORS middleware allows frontend origin
- Check preflight OPTIONS handling
- Verify frontend is running on allowed port (all localhost ports allowed in dev)

### JWT Issues
- Verify `JWT_SECRET` is set in backend `.env`
- Check token format: `Bearer <token>`

### Double/Middleware Issues (HyperExpress)
- Middleware must use `next()` callback pattern
- For OPTIONS requests, end response without calling `next()`
- See `backend/index.ts` for correct CORS middleware pattern

---

## Production Deployment

### Frontend (Static Hosting)
```bash
npm run build
# Deploy build/client/ to Vercel, Netlify, Cloudflare Pages, etc.
```

### Backend (Node.js Server)
```bash
# Deploy backend/ folder to any Node.js hosting
# Set production environment variables:
# - NODE_ENV=production
# - JWT_SECRET=<secure-random-string>
```

### Docker
```bash
docker build -t react-spa-with-hyper-express .
docker run -p 3000:3000 react-spa-with-hyper-express
```

---

## References

- [React Router v7 Docs](https://reactrouter.com/)
- [HyperExpress Docs](https://github.com/kartikk221/hyper-express)
- [TypeORM Docs](https://typeorm.io/)
- [TailwindCSS v4 Docs](https://tailwindcss.com/)
