import { Hono } from "hono";
import { authMiddleware, requireAdmin, requireSuperAdmin } from "../../middlewares/auth";
import { AdminService } from "../../services/admin.service";
import { AppBindings, AppVariables } from "../../types/types";
import { AppError } from "../../utils/errors";

const adminMemberRoutes = new Hono<{
  Bindings: AppBindings;
  Variables: AppVariables;
}>();

adminMemberRoutes.use('/*', authMiddleware, requireAdmin);

adminMemberRoutes.get('/members', async(c) => {
  try {
    const { member } = c.get('prisma')
    const members = await member.findMany({
      where: {
        NOT: {
          role: 'SUPER_ADMIN'
        }
      },
      select: {
        id: true,
        name: true,
        phone: true,
        role: true,
      },
    })

    return c.json({ success: true, data: members })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch All members' }, 500)
  }
})

adminMemberRoutes.patch('/members/:id/promote', requireAdmin, async(c) => {
  try {
    const prisma = c.get('prisma');
    const userId = c.req.param('id');

    const adminService = new AdminService(prisma, c.env.JWT_SECRET);

    const result = await adminService.promoteToLeader(userId);

    return c.json( result );
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({
        success: false,
        error: error.message,
        code: error.code
      }, 500);
    }

    return c.json({ success: false, error: 'Internal Server error' }, 500)
  }
});

adminMemberRoutes.patch('/members/:id/demote', requireAdmin, async(c) => {
  try {
    const prisma = c.get('prisma');
    const userId = c.req.param('id');

    
    const adminService = new AdminService(prisma, c.env.JWT_SECRET);

    const result = await adminService.demoteLeader(userId);

    return c.json( result );
  } catch (error) {
    return c.json({ success: false, error: 'Failed to Demote the User' }, 500)
  }
});

// Create new Admin (Super-admin only)
adminMemberRoutes.post('/create-admin', requireSuperAdmin, async (c) => {
  try {
    const prisma = c.get('prisma');
    const currentUser = c.get('userId');
    const { username, name, phone, password } = await c.req.json();

    const existingUser = await prisma.member.findUnique({
      where: { username }
    });

    if (existingUser) {
      throw new Error('User already exists with given username');
    }

    const adminService = new AdminService(prisma, c.env.JWT_SECRET);
    const result = await adminService.createAdmin({name, username, phone, password, createdBy: currentUser});

    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to Create Admin' }, 500)
  }
});

export default adminMemberRoutes
