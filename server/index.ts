import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { authRoute } from './routes/authRoute.ts'
import {userRoutes} from './routes/userRoutes'

const app = new Hono()
app.use(logger())

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

// Configure CORS for both environments
app.use('/api/*', cors({
  origin: isDevelopment ? [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3000'
  ] : [
    process.env.FRONTEND_URL || 'https://your-frontend-domain.vercel.app',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'https://roaming-roomies.onrender.com'
  ].filter(Boolean),
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}))

// API Routes
const apiRoutes = app.basePath("/api").route("/user", userRoutes).route("/", authRoute);

// Health check endpoint
const healthCheck = app.get('/health', (c) => {
  return c.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Serve static files in production
if (isProduction) {
  // Serve static assets
  app.use('/assets/*', serveStatic({ 
    root: './client/dist',
    rewriteRequestPath: (path) => path.replace(/^\/assets/, '')
  }))
  
  // Serve other static files (CSS, JS, etc.)
  app.use('/_astro/*', serveStatic({ root: './client/dist' }))
  app.use('/favicon.ico', serveStatic({ root: './client/dist' }))
  
  // SPA fallback - serve index.html for all other routes
  app.use('*', serveStatic({ 
    root: './client/dist', 
    path: 'index.html'
  }))
}

export default app;
export { apiRoutes, healthCheck };
export type ApiRoutes = typeof apiRoutes;