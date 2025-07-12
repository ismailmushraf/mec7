import { Hono } from "hono";
import { authMiddleware, requireAdmin } from "../../middlewares/auth";
import { AppBindings, AppVariables } from "../../types/types";
import EventService from "../../services/event.service";
import { AppError } from "../../utils/errors";

const adminEventRoutes = new Hono<{
  Bindings: AppBindings;
  Variables: AppVariables;
}>();

adminEventRoutes.use('/*', authMiddleware, requireAdmin);

adminEventRoutes.post('/create', async(c) => {
  try {
    const prisma = c.get('prisma');
    const { title, description, eventType, location, date } = await c.req.json();
    
    const eventService = new EventService(prisma);
    const event = await eventService.create({ title, description, eventType, location, date });

    return c.json({ success: true, message: 'Event successfully created', event }, 201);
  } catch (error) {
    return c.json({ success: false, message: 'Failed to create an Event' }, 400);
  }
});

adminEventRoutes.patch('/update/:id', async(c) => {
  try {
    const prisma = c.get('prisma');
    const eventId = c.req.param('id'); 
    const { title, description, eventType, location, date } = await c.req.json();
    
    const eventService = new EventService(prisma);
    const event = await eventService.update(eventId, { title, description, eventType, location, date });

    return c.json({ success: true, message: 'Event successfully updated', event }, 200);
  } catch (error) {
    return c.json({ success: false, message: 'Failed to update an Event' }, 400);
  }
});

adminEventRoutes.delete('/delete/:id', async(c) => {
  try {
    const prisma = c.get('prisma');
    const eventId = c.req.param('id');

    const eventService = new EventService(prisma);
    const result = await eventService.delete(eventId);

    return c.json( result );
  } catch(error) {
    if (error instanceof AppError) {
      return c.json({
        success: false,
        error: error.message,
        code: error.code
      });
    }
  }
});

adminEventRoutes.patch('/cancel/:id', async(c) => {
  try {
    const prisma = c.get('prisma');
    const eventId = c.req.param('id');
    const { reason } = await c.req.json();

    const eventService = new EventService(prisma);
    const result = await eventService.cancel(eventId, reason);

    return c.json( result );
  } catch(error) {
    if (error instanceof AppError) {
      return c.json({
        success: false,
        error: error.message,
        code: error.code
      });
    }
  }
});

export default adminEventRoutes;
