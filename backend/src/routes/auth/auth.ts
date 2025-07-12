import { Hono } from "hono";
import { AuthService } from "../../services/auth.service";

import { AppBindings, AppVariables } from "../../types/types";

const authRoutes = new Hono<{
  Bindings: AppBindings;
  Variables: AppVariables;
}>();

// public registration (for members only)
authRoutes.post('/register', async (c) => {
  try {
    const prisma = c.get('prisma');
    const { phone, name, password } = await c.req.json();

    // Validate input
    if (!phone || !name || !password) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }

    const authService = new AuthService(prisma, c.env.JWT_SECRET);
    const result = await authService.register({phone, name, password});

    return c.json({ 
      success: true, 
      data: result 
    });
  } catch (error: any) {
    if (error.message === 'User already exists') {
      return c.json({ success: false, error: error.message }, 400);
    }
    return c.json({ success: false, error: 'Registration failed' }, 500);
  }
});

authRoutes.post('/login', async (c) => {
  try {
    const prisma = c.get('prisma');
    const { identifier, password } = await c.req.json();

    if (!identifier || !password) {
      return c.json({ success: false, error: 'Missing credentials' }, 400);
    }

    const authService = new AuthService(prisma, c.env.JWT_SECRET);
    const result = await authService.login(identifier, password);

    return c.json({ 
      success: true, 
      data: result 
    });
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      return c.json({ success: false, error: error.message }, 401);
    }
    return c.json({ success: false, error: 'Login failed' }, 500);
  }
});

export default authRoutes;
