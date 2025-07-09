import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import adminRoutes from './routes/admin'
import { JWTPayload } from 'hono/utils/jwt/types'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    prisma: JWTPayload,
    jwt_secret: string
  }
}>()

// Initialize Prisma with Accelerate
app.use('/api/*', cors());

app.use(async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  c.set('prisma', prisma);
  c.set('jwt_secret', c.env.JWT_SECRET.toString());
  await next();
});

// Routes
app.route('/api/admins', adminRoutes)

export default app;
