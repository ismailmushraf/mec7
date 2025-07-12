import { Hono } from "hono";
import { AppBindings, AppVariables } from "../../types/types";
import { authMiddleware } from "../../middlewares/auth";
import EventService from "../../services/event.service";
import { AppError } from "../../utils/errors";

const memberEventRoutes = new Hono<{
  Bindings: AppBindings;
  Variables: AppVariables;
}>();

// not necessary to use auth here since we need to show them publicly
//memberEventRoutes.use('/*', authMiddleware); 

memberEventRoutes.get('/', async(c) => {
  try {
    const prisma = c.get('prisma');

    const eventService = new EventService(prisma);
    const events = await eventService.getAll();

    return c.json({ success: true,  events }, 200);
  } catch (error) {
    return c.json({ success: false, message: 'Error while fetching all events' }, 500);
  }
});

memberEventRoutes.get('/:id', async(c) => {
  try {
    const prisma = c.get('prisma');
    const eventId = c.req.param('id');

    const eventService = new EventService(prisma);
    const event = await eventService.getById(eventId);

    return c.json({ success: true,  event }, 200);
  } catch (error) {
    if (error instanceof AppError) {
      return c.json({
        message: error.message,
        code: error.code
      });
    }
    return c.json({ success: false, message: 'Error while fetching event' }, 500);
  }
});

export default memberEventRoutes;
