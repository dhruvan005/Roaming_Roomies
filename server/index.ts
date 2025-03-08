import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import {userRoutes} from './routes/userRoutes'

const app = new Hono()
app.use(logger())
app.use('/api/*', cors())

// Serve static files
app.use('*', serveStatic({ root: './frontend/dist' }))

app.get('/hi', (c) => {
  return c.text('Hello Hono! hi i am a new developer')
})

const apiRoutes = app.basePath("/api").route("/user", userRoutes)


// Serve static files

app.use('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))


export default {
  port: 3000,
  fetch: app.fetch,
}
export type ApiRoutes = typeof apiRoutes;