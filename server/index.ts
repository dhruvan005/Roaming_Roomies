import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { authRoute } from './routes/authRoute.ts'
import {userRoutes} from './routes/userRoutes'

const app = new Hono()
app.use(logger())
app.use('/api/*', cors())
// app.use('*', errorHandler());


const apiRoutes = app.basePath("/api").route("/user", userRoutes).route("/", authRoute);

// Don't forgot to change the callback URL in the Kinde dashboard

// Serve static files
app.use('/assets/*', serveStatic({ root: './client/dist' }))
app.use('*', serveStatic({ root: './client/dist', path: 'index.html' }))


export default app;
export type ApiRoutes = typeof apiRoutes;