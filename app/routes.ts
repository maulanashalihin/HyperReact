import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("auth/login", "routes/auth/login.tsx"),
  route("auth/register", "routes/auth/register.tsx"),
  route("dashboard", "routes/dashboard/_index.tsx"),
  route("dashboard/users", "routes/dashboard/users.tsx"),
] satisfies RouteConfig;
