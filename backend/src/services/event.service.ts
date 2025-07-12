import { PrismaClient, EventType } from "@prisma/client/edge";
import { EventResponse, CancelEventResponse, EventDetailResponse, MemberResponse } from "../types/types";
import { AppError } from "../utils/errors";
import NotificationService from "./notification.service";

class EventService {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    title: string,
    description: string,
    eventType: EventType,
    location: string,
    date: string
  }) : Promise<EventResponse> {
    const { title, description, eventType, location, date } = data;

    const event = await this.prisma.event.create({
      data: {
        title,
        description,
        eventType,
        location,
        date
      }
    });

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      location: event.location, 
      date: event.date.toString()
    }
  }

  async update(eventId: string, data: {
    title?: string,
    description?: string,
    eventType?: string,
    location?: string,
    date?: string
  }): Promise<EventResponse> {
    const updateData = Object.entries(data)
      .filter(([_, value]) => value != undefined)
      .reduce((acc, [key, value]) => {
        if (key == 'date' && value) {
          acc[key] = new Date(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as any);

    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: updateData
    });

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      location: event.location, 
      date: event.date.toString()
    };
  }

  async delete(eventId: string): Promise<{ success: boolean, message: string }> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: true
      }
    });

    if (!event) {
      throw new AppError('Event not found', 404, 'NO_EVENT')
    }

    if (event.registrations.length > 0) {
      throw new AppError(
        `Cannot delete event. ${event.registrations.length} registration(s) found. ` +
        'Please cancel the event instead to notify registered participants.',
        403
      );
    }

    if (new Date(event.date) < new Date()) {
      throw new AppError(
        'Cannot delete a Past event. Archive instead',
        403
      );
    }

    await this.prisma.event.delete({
      where: { id: eventId }
    });

    return {
      success: true,
      message: 'Event deleted Successfully'
    } 
  }

  async cancel(eventId: string, reason?: string): Promise<CancelEventResponse> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: {
          include: {
            member: true
          }
        }
      }
    });

    if (!event) {
      throw new AppError('Event not found', 404, 'NO_EVENT');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        title: `[CANCELLED] ${event.title}`,
        description: `${event.description}\n\nCANCELLED: ${reason || 'Event has been cancelled'}`
      } 
    });

    const notificationService = new NotificationService(this.prisma);

    const notification = await notificationService.create({
      title: 'Event Cancelled',
      message: `The event "${event.title}" schedule for ${event.date.toLocaleDateString()} has been cancelled. ${reason || ''}`,
      type: 'EVENT',
      targetAll: false,
      targetMembers: event.registrations
        .filter(reg => reg.memberId)
        .map(reg => reg.memberId!),
      });

    return {
      success: true,
      event: updatedEvent,
      notificationId: notification.id,
    };
  }

  async getById(eventId: string): Promise<EventDetailResponse> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        description: true,
        eventType: true,
        date: true,
        location: true,
        registrations: {
          select: {
            member: {
              select: {
                id: true,
                name: true,
                phone: true
              }
            }
          }
        }
      }
    });

    if (!event) {
      throw new AppError('No event with the given Id', 404)
    }

    const members: MemberResponse[] = event.registrations
      .map((r) => r.member)
      .filter((m): m is MemberResponse => m !== null);

    const response: EventDetailResponse = {
      event: {
        id: event.id,
        title: event.title,
        description: event.description,
        eventType: event.eventType,
        date: event.date.toISOString(), // fix: convert Date -> string
        location: event.location,
      },
      registrations: members,
    };

    return response;
  }

  async getAll(): Promise<EventResponse[]> {
    const events = await this.prisma.event.findMany({
      where: {
        date: {
          gt: new Date()
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        eventType: true,
        date: true,
        location: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    return events.map(event => ({
      ...event,
      date: event.date.toISOString(),
    }));
  }
}

export default EventService;
