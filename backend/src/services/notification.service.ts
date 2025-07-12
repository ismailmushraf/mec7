import { PrismaClient, NotificationType } from "@prisma/client/edge";
import { NotificationResponse } from "../types/types";

class NotificationService {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    title: string,
    message: string,
    type: NotificationType,
    targetAll: boolean,
    targetMembers: string[]
  }): Promise<NotificationResponse> {

    const { title, message, type, targetAll, targetMembers } = data;
   
    const notification = await this.prisma.notification.create({
      data: {
        title,
        message,
        type,
        targetAll,
        targetMembers
      }
    });

    return {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: notification.type
    }
  }
}

export default NotificationService;
