import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { authRoute } from './routes/authRoute.ts'
import {userRoutes} from './routes/userRoutes'

const app = new Hono()
app.use(logger())

// Configure CORS
app.use('/api/*', cors({
  origin: [
    'http://localhost:3001',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.FRONTEND_URL || ''
  ].filter(Boolean),
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}))

const apiRoutes = app.basePath("/api").route("/user", userRoutes).route("/", authRoute);
const healthCheck = app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});
// Don't forgot to change the callback URL in the Kinde dashboard

// Serve static files
app.use('/assets/*', serveStatic({ 
  root: './client/dist',
  rewriteRequestPath: (path) => path.replace(/^\/assets/, '')
}))

// Serve index.html for all other routes (SPA fallback)
app.use('*', serveStatic({ 
  root: './client/dist', 
  path: 'index.html'
}))


export default app;
export { apiRoutes, healthCheck };
export type ApiRoutes = typeof apiRoutes;