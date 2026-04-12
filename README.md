# HyperReact Boilerplate

> **Modern full-stack React starter with decoupled architecture**

A production-ready boilerplate for building React applications with a **separate backend API**. Features React Router v7 + Vite + TailwindCSS on the frontend, and HyperExpress + TypeORM + SQLite on the backend.

[![React](https://img.shields.io/badge/React-19.2.4-61dafb?style=flat&logo=react)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v7.14.0-ca4245?style=flat&logo=react-router)](https://reactrouter.com/)
[![HyperExpress](https://img.shields.io/badge/HyperExpress-v6.17.3-00f0ff?style=flat)](https://github.com/kartikk221/hyper-express)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.9.3-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.2.2-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?style=flat&logo=docker)](https://www.docker.com/)

---

## ✨ Features

- **⚡️ Decoupled Architecture** - Frontend and backend run independently, deploy separately
- **🚀 High-Performance Backend** - HyperExpress (~7.5x faster than Express.js)
- **🔄 React Router v7** - Modern routing with loaders and data mutations
- **🔐 JWT Authentication** - Ready-to-use auth system with bcrypt password hashing
- **📦 TypeORM + SQLite** - Type-safe database with zero configuration
- **🎨 Beautiful UI** - TailwindCSS + custom UI components (Avatar, Badge, Button, Card, Input, Toast)
- **🐳 Docker-Ready** - Deploy anywhere with Docker
- **📱 Responsive Design** - Mobile-first, production-ready components

---

## 🤔 Why HyperReact?

### The Problem We Solve

| Alternative | Problem |
|-------------|---------|
| **Next.js + Express API** | Over-engineered, heavy bundle, complex setup |
| **React Router Full-Stack** | Tightly coupled, requires Node.js server for frontend |
| **Vite React + Manual Backend** | 2-3 days setup for auth, DB, UI components |

### HyperReact Sweet Spot

✅ **Not too simple** - Production-ready with auth, database, and UI  
✅ **Not too complex** - No SSR overhead, no monolithic deployment  
✅ **Decoupled architecture** - Frontend and backend scale independently  
✅ **Deploy anywhere** - Static hosting for frontend, any Node.js host for backend  
✅ **5-minute setup** - `npm install` and you're ready to code

### Best For

- 🚀 **Startup MVPs** - Launch in days, not weeks
- 📊 **Internal Tools** - Dashboards, admin panels, CRUD apps
- 💼 **SaaS Products** - Multi-user apps with separate API
- 👨‍💻 **Freelance Projects** - Reusable template for client work
- 💬 **Real-time Apps** - Chat, notifications, live updates (WebSocket/SSE supported via HyperExpress)

### When NOT to Use

- 📰 **SEO-heavy content sites** → Use **Next.js** with SSR (this stack is client-side rendered)
- 📄 **Simple static sites** → Use **Vite** + React only (no backend needed)
- 🏗️ **Complex enterprise requiring microservices** → Use **NestJS**, **Go**, or dedicated service architecture

---

## 💪 Scaling Potential

HyperReact can handle **100,000+ RPS** with proper infrastructure:

| Component | Service | Cost/Month |
|-----------|---------|------------|
| **Frontend** | Cloudflare Pages | Free (unlimited bandwidth) |
| **Backend** | Vultr High Frequency | $6-12 |
| **Database** | SQLite WAL + Litestream | ~$5 (replication) |
| **Total** | - | **~$11-17/month** |

With SQLite WAL mode + Litestream replication, you get:
- ✅ High write throughput
- ✅ Point-in-time recovery
- ✅ Cross-region replication
- ✅ Horizontal read scaling

---

## 🔥 Performance Benchmark

Tested with `wrk` (4 threads, 100 connections, 30s):

| Framework | Requests/sec | Latency (avg) | Transfer/sec |
|-----------|-------------:|--------------:|-------------:|
| **HyperExpress** | **196,849** | **0.52ms** | **16.33MB** |
| **Express.js** | **26,325** | **4.07ms** | **5.98MB** |
| **Improvement** | **~7.5x faster** | **~8x lower latency** | **~3x throughput** |

HyperExpress delivers **enterprise-grade performance** for your API layer.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      HyperReact Stack                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐         ┌──────────────────────┐  │
│  │     Frontend        │         │      Backend         │  │
│  │  React Router v7    │◄───────►│   HyperExpress API   │  │
│  │  Vite               │   REST  │   TypeORM            │  │
│  │  TailwindCSS        │   JSON  │   SQLite             │  │
│  │  Port: 5173         │         │   Port: 3001         │  │
│  └─────────────────────┘         └──────────────────────┘  │
│                                                             │
│  Development: Separate servers     Production: Static + API │
│  Production:  Static hosting       Deployment: Separate     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Why Decoupled Architecture?

| Benefit | Description |
|---------|-------------|
| 🔒 **Security** | Frontend is static (no server vulnerabilities) |
| 📈 **Scalability** | Scale frontend (CDN) and backend (API) independently |
| 💰 **Cost** | Frontend hosting is free, backend uses minimal resources |
| 🔄 **Flexibility** | Swap frontend/backend without rewriting everything |
| 🚀 **Performance** | Frontend served from edge CDN, backend optimized for API |

---

## 💰 Cost Estimate

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| **Frontend** (Vercel/Netlify) | Free | $0 |
| **Backend** (Railway/Render) | Hobby | $5-10 |
| **Database** (SQLite file) | - | $0 |
| **Total** | - | **~$5-10/month** |

Perfect for side projects and startups! 🎉

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hyperreact-boilerplate.git
cd hyperreact-boilerplate

# Install dependencies
npm install
```

### Development

Start both frontend and backend:

```bash
npm run dev
```

This launches:
- **Frontend**: `http://localhost:5173` (Vite dev server with HMR)
- **Backend**: `http://localhost:3001` (HyperExpress API)

### Separate Development

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Build for Production

```bash
# Build frontend (outputs to build/client/)
npm run build
```

### Type Checking

```bash
npm run typecheck
```

---

## 📚 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React Router | v7.14.0 | Routing, SSR, data loading with loaders |
| React | v19.2.4 | UI framework |
| Vite | v8.0.3 | Build tool, dev server |
| TailwindCSS | v4.2.2 | Utility-first CSS |
| TypeScript | v5.9.3 | Type safety |
| Lucide React | v1.8.0 | Icon library |

#### Custom UI Components

- **Avatar** - User avatar with gradient fallback and initials
- **Badge** - Status badges with variants (default, success, warning, error, info)
- **Button** - Gradient variants with isLoading support
- **Card** - Composed components (Card, CardHeader, CardTitle, CardContent, CardFooter)
- **Input** - Form input with icon support and error states
- **Toast** - Custom toast notifications with auto-dismiss and icons

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| HyperExpress | v6.17.3 | High-performance web framework (7.5x faster than Express) |
| TypeORM | v0.3.28 | ORM for TypeScript/JavaScript |
| better-sqlite3 | v12.8.0 | SQLite database driver |
| bcrypt | v6.0.0 | Password hashing |
| jsonwebtoken | v9.0.3 | JWT authentication |
| dotenv | v17.4.1 | Environment variables |

#### Why HyperExpress?

| Framework | Requests/sec | Latency |
|-----------|-------------:|--------:|
| HyperExpress | ~197,000 | ~0.5ms |
| Fastify | ~100,000 | ~1ms |
| Express.js | ~26,000 | ~4ms |
| NestJS | ~20,000 | ~5ms |

*Tested with `wrk` (4 threads, 100 connections, 30s) on Apple M1*

---

## 📁 Project Structure

```
hyperreact-boilerplate/
├── app/                          # Frontend React application
│   ├── components/
│   │   ├── layout/
│   │   │   └── header.tsx        # Global header with navigation & theme toggle
│   │   └── ui/                   # Custom UI components
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── toast.tsx
│   ├── contexts/
│   │   ├── auth.context.tsx      # Auth state provider
│   │   └── theme.context.tsx     # Dark/light theme provider
│   ├── hooks/
│   │   └── use-auth.ts           # Auth hook
│   ├── lib/
│   │   ├── api.ts                # Fetch API client
│   │   ├── types.ts              # TypeScript types
│   │   └── utils.ts              # Utility functions
│   ├── routes/
│   │   ├── _index.tsx            # Home page (/)
│   │   ├── auth/
│   │   │   ├── login.tsx         # Login page (/auth/login)
│   │   │   └── register.tsx      # Register page (/auth/register)
│   │   └── dashboard/
│   │       ├── _index.tsx        # Dashboard (/dashboard)
│   │       └── users.tsx         # Users management (/dashboard/users)
│   ├── app.css                   # Global styles
│   ├── root.tsx                  # Root layout
│   └── routes.ts                 # Route configuration
│
├── backend/                      # Backend API server
│   ├── config/
│   │   ├── database.ts           # TypeORM DataSource
│   │   └── env.ts                # Environment config
│   ├── dto/                      # Data Transfer Objects
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── entities/
│   │   └── user.entity.ts        # User entity
│   ├── middleware/
│   │   ├── auth.middleware.ts    # JWT validation
│   │   └── error.middleware.ts   # Error handler
│   ├── routes/
│   │   ├── auth.route.ts         # /api/auth/* endpoints
│   │   └── users.route.ts        # /api/users/* endpoints
│   ├── services/
│   │   ├── auth.service.ts       # Auth business logic
│   │   └── users.service.ts      # Users CRUD logic
│   ├── migrations/               # TypeORM migrations
│   ├── .env                      # Backend environment
│   ├── index.ts                  # HyperExpress entry point
│   └── database.sqlite           # SQLite database (git-ignored)
│
├── public/                       # Static assets
├── .env                          # Frontend environment
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tsconfig.json
```

---

## 🔌 API Endpoints

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

## 🔐 Authentication Flow

1. **Register**: `POST /api/auth/register` → returns `{ user, token }`
2. **Login**: `POST /api/auth/login` → returns `{ user, token }`
3. **Token Storage**: Frontend stores token in `localStorage`
4. **Protected Requests**: Token sent via `Authorization: Bearer <token>` header
5. **Token Validation**: Backend validates JWT using middleware
6. **Auto-redirect**: Frontend redirects to `/auth/login` on 401

---

## 🌍 Environment Variables

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

## 🐳 Docker Deployment

### Build and Run

```bash
# Build image
docker build -t hyperreact-app .

# Run container
docker run -p 3000:3000 hyperreact-app
```

### Deploy to Cloud

The Docker container can be deployed to:

- **AWS ECS** - Elastic Container Service
- **Google Cloud Run** - Serverless containers
- **Azure Container Apps** - Managed containers
- **DigitalOcean App Platform** - Simple deployment
- **Fly.io** - Edge deployment
- **Railway** - One-click deployment

---

## 🚢 Production Deployment

### Frontend (Static Hosting)

```bash
npm run build
# Deploy build/client/ to:
# - Vercel
# - Netlify
# - Cloudflare Pages
# - AWS S3 + CloudFront
```

### Backend (Node.js Server)

Deploy the `backend/` folder to any Node.js hosting:

- **Railway** - Simple Node.js hosting
- **Render** - Free tier available
- **Fly.io** - Edge deployment
- **AWS Lambda** - Serverless (with adapter)
- **DigitalOcean App Platform**

Set production environment variables:
- `NODE_ENV=production`
- `JWT_SECRET=<secure-random-string>`

---

## 🛠️ Common Tasks

### Add a New API Endpoint

1. Add route handler in `backend/routes/*.route.ts`
2. Add service method in `backend/services/*.service.ts` if needed
3. Update frontend API client in `app/lib/api.ts`

### Add a New Page with Data Loading

1. Create route component in `app/routes/`
2. Add `clientLoader` export for data fetching (runs before render)
3. Use `useLoaderData()` to access data in component
4. Add route config in `app/routes.ts`
5. Add navigation link in `app/components/layout/header.tsx`

### Database Changes

1. Modify entity in `backend/entities/user.entity.ts`
2. Create migration (TypeORM migrations)
3. Run migration

---

## 🔧 Troubleshooting

### Double API Requests on Route Load

- **Cause**: Using `useEffect` for data fetching (fires twice in React 18+ Strict Mode)
- **Solution**: Use React Router v7 `clientLoader` instead of `useEffect`

### CORS Errors

- Ensure backend CORS middleware allows frontend origin
- Check preflight OPTIONS handling

### JWT Issues

- Verify `JWT_SECRET` is set in backend `.env`
- Check token format: `Authorization: Bearer <token>`

### Database Errors

- Delete `backend/database.sqlite` to reset
- Check TypeORM `synchronize` setting in `backend/config/database.ts`

---

## 📖 Documentation

- [React Router v7](https://reactrouter.com/)
- [HyperExpress](https://github.com/kartikk221/hyper-express)
- [TypeORM](https://typeorm.io/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - feel free to use this boilerplate for your projects.

---

## 🙏 Acknowledgments

Built with ❤️ using **HyperReact** stack.

- [React Router](https://reactrouter.com/) - Modern web framework for React
- [HyperExpress](https://github.com/kartikk221/hyper-express) - High-performance Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript
- [Lucide React](https://lucide.dev/) - Beautiful icon library

---

**Happy Coding! 🚀**
