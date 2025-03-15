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


// app.get('/hi', (c) => {
//   return c.text('Hello Hono! hi i am a new developer')
// })

const apiRoutes = app.basePath("/api").route("/user", userRoutes).route("/", authRoute);


// Serve static files

app.use('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))


export default app;
export type ApiRoutes = typeof apiRoutes;