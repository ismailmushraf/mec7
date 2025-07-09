import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { Role } from "@prisma/client";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader || authHeader.startsWith('Bearer')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }

    const token = authHeader.split(' ')[1]
    const secret = c.env.JWT_SECRET;

    const payload = await verify(token, secret);

    c.set('userId', payload.userId);
    c.set('role', payload.role);
    await next();
  } catch (error) {
    return c.json({ success: false, error: 'Invalid token' }, 401);
  }
}

export const requireRole = (...allowedRoles: Role[]) => {
  return async (c: Context, next: Next) => {
    const role = c.get('role');
    const userId = c.get('userId');

    if (!userId || !allowedRoles.includes(role)) {
      return c.json({
        success: false,
        error: 'Insufficient permissions'
      }, 403);
    }

    await next();
  };
}

// Convenience middlewares
export const requireAdmin = requireRole('ADMIN', 'SUPER_ADMIN');
export const requireSuperAdmin = requireRole('SUPER_ADMIN');
export const requireLeader = requireRole('LEADER', 'ADMIN', 'SUPER_ADMIN');
