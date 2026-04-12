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
│   │   │   └── header.tsx        # Global header with navigation
│   │   └── ui/
│   │       ├── button.tsx        # Reusable Button component
│   │       ├── card.tsx          # Card components
│   │       └── input.tsx         # Form Input component
│   ├── contexts/
│   │   └── auth.context.tsx      # Auth state provider
│   ├── hooks/
│   │   └── use-auth.ts           # Auth hook (exports from context)
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
│   ├── app.css                   # TailwindCSS imports
│   ├── root.tsx                  # Root layout with AuthProvider
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
- Response interceptor handles 401 (clears storage, redirects to login)

### Backend Body Parsing
- Uses **native `req.json()`** method (no middleware)
- More performant than middleware approach
- Only parses JSON when needed

### CORS
- Backend sets CORS headers for `http://localhost:5173`
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

### Add a New Page
1. Create component in `app/routes/`
2. Add route config in `app/routes.ts`
3. Add navigation link in `app/components/layout/header.tsx`

### Database Changes
1. Modify entity in `backend/entities/user.entity.ts`
2. Create migration (TypeORM migrations)
3. Run migration

---

## Troubleshooting

### CORS Errors
- Ensure backend CORS middleware allows frontend origin
- Check preflight OPTIONS handling

### JWT Issues
- Verify `JWT_SECRET` is set in backend `.env`
- Check token format: `Bearer <token>`

### Database Errors
- Delete `backend/database.sqlite` to reset
- Check TypeORM `synchronize` setting

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
