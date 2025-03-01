import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { userRoute } from './routes/userRoutes'

const app = new Hono()
app.use(logger())
app.use('/api/*', cors())

// Serve static files
app.use('*', serveStatic({ root: './frontend/dist' }))

app.get('/hi', (c) => {
  return c.text('Hello Hono! hi i am a new developer')
})

app.route('/api/user', userRoute);



// Serve the index.html file for all other routes
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default {
  port: 3000,
  fetch: app.fetch,
}