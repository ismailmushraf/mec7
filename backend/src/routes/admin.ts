import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { authMiddleware, requireAdmin } from "../middlewares/auth";
import { AuthService } from "../services/auth.service";

const adminRoutes = new Hono<{
  Bindings: {
    JWT_SECRET: string
  },
  Variables: {
    prisma: PrismaClient,
    userId: string
  }
}>();

adminRoutes.use('/*', authMiddleware, requireAdmin);

adminRoutes.get('/', async(c) => {
  try {
    const { member } = c.get('prisma')
    const members = await member.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true
      },
    })

    return c.json({ success: true, data: members })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch admins' }, 500)
  }
})

adminRoutes.patch('/users/:id/promote', async(c) => {
  const prisma = c.get('prisma');
  const userId = c.req.param('id');
  const currentUser = c.get('userId');

  const authService = new AuthService(prisma, c.env.JWT_SECRET);

  const result = await authService.promoteToLeader(userId, currentUser);

  return c.json( result );
});

export default adminRoutes
