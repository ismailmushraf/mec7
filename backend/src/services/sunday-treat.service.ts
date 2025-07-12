import { PrismaClient, TreatStatus } from "@prisma/client/edge";
import { SundayTreatResponse } from "../types/types";
import { AppError } from "../utils/errors";

class SundayTreatService {
  constructor(private prisma: PrismaClient) {}

  async register(userId: string, date: string, location: string): Promise<SundayTreatResponse> {

    // check if the date is in the past
    if (new Date(date) < new Date()) {
      throw new AppError('The Date cannot be selected from the past', 403)
    }

    // stop a user from creating multiple request at a time
    const previousTreats = await this.prisma.sundayTreat.findMany({ 
      where: { hostMemberId: userId , status: 'PROPOSED'}
    });

    if (previousTreats.length > 0) {
      throw new AppError('You already have a Request proposal in the plate. so, wait until we finish it', 500);
    }
    
    const sundayTreat = await this.prisma.sundayTreat.create({
      data: {
        proposedDate: date,
        location: location,
        hostMemberId: userId
      },
      select: {
        id: true,
        proposedDate: true,
        location: true,
        status: true, 
        hostMember: {
          select: {
            id: true,
            phone: true,
            name: true
          }
        }
      }
    });

    if (!sundayTreat) {
      throw new AppError("Couldn't register your request now. Please try again", 500);
    }

    const { hostMember, proposedDate, ...restTreat } = sundayTreat;

    return {
      treat: {
        ...restTreat,
        proposedDate: proposedDate.toString()
      },
      host: hostMember
    }
  }

  // for current user
  async getAll(userId: string): Promise<SundayTreatResponse[]> {
    const sundayTreats = await this.prisma.sundayTreat.findMany({
      where: {
        proposedDate: {
          gt: new Date()
        },
        hostMemberId: userId
      },
      select: {
        id: true,
        proposedDate: true,
        location: true,
        status: true, 
        hostMember: {
          select: {
            id: true,
            phone: true,
            name: true
          }
        }
      }
    }); 

    return sundayTreats.map(({ hostMember, proposedDate, ...restTreat }) => ({
      treat: {
        ...restTreat,
        proposedDate: proposedDate.toISOString()
      },
      host: hostMember
    }));
  }

  // for admin
  async viewAllEntries(): Promise<SundayTreatResponse[]> {
    const sundayTreats = await this.prisma.sundayTreat.findMany({
      select: {
        id: true,
        proposedDate: true,
        location: true,
        status: true, 
        hostMember: {
          select: {
            id: true,
            phone: true,
            name: true
          }
        }
      }
    }); 

    return sundayTreats.map(({ hostMember, proposedDate, ...restTreat }) => ({
      treat: {
        ...restTreat,
        proposedDate: proposedDate.toISOString()
      },
      host: hostMember
    }));
  }
  //async getById(id: string): Promise<SundayTreatResponse> {}

  async changeStatus(sundayTreatId: string, status: TreatStatus): Promise<SundayTreatResponse> {
    const treat = await this.prisma.sundayTreat.findUnique({
      where: { id: sundayTreatId }
    });

    if (!treat) {
      throw new AppError('The Sunday Treat Request is not available', 404);
    }

    const result = await this.prisma.sundayTreat.update({
      where: { id: sundayTreatId },
      data: { status: status },
      select: {
        id: true,
        proposedDate: true,
        location: true,
        status: true, 
        hostMember: {
          select: {
            id: true,
            phone: true,
            name: true
          }
        }
      }
    });
  
    const { proposedDate, hostMember, ...restTreat } = result; 

    return {
      treat: {
        ...restTreat,
        proposedDate: proposedDate.toISOString()
      },
      host: hostMember
    }
  }

  async approve(sundayTreatId: string): Promise<SundayTreatResponse> {
    const result = await this.prisma.$transaction(async (tx) => {
      const treat = await tx.sundayTreat.findUnique({
        where: { id: sundayTreatId },
        include: {
          hostMember: true
        }
      });

      if (!treat) {
        throw new AppError('The Sunday treat request is not available', 404);
      }

      if (treat.status !== 'PROPOSED') {
        throw new AppError(`Cannot approve treat with status ${treat.status}`, 400);
      }

      const udpatedTreat = await tx.sundayTreat.update({
        where: { id: sundayTreatId },
        data: {
          status: 'APPROVED',
          approvedAt: new Date()
        },
        select: {
          id: true,
          proposedDate: true,
          location: true,
          status: true,
          hostMember: {
            select: {
              id: true,
              phone: true,
              name: true
            }
          }
        }
      });

      const event = await tx.event.create({
        data: {
          title: `Sunday Breakfast at ${udpatedTreat.hostMember.name}'s`,
          description: `Sunday Breakfast hosted by ${udpatedTreat.hostMember.name}`,
          eventType: 'SUNDAY_PROGRAM',
          date: treat.proposedDate,
          location: treat.location || `${udpatedTreat.hostMember.name}'s residence`
        }
      });

      const notification = await tx.notification.create({
        data: {
          title: 'Sunday Treat Approved! 🎉',
          message: `Your sunday breakfast hosting request for ${treat.proposedDate.toLocaleDateString()} `+
                  `has been approved. Thank you for your hospitality`,
          type: 'GENERAL',
          targetAll: false,
          targetMembers: [treat.hostMemberId]
        }
      });

      return {
        udpatedTreat,
        event,
        notification
      };
    });

    const { proposedDate, hostMember, ...restTreat } = result.udpatedTreat;

    return {
      treat: {
        ...restTreat,
        proposedDate: proposedDate.toISOString()
      },
      host: hostMember
    }
  }

  async deleteRegistration(id: string, userId: string): Promise<{ success: boolean }> {
    const sundayTreat = await this.prisma.sundayTreat.findUnique({
      where: { id: id, hostMemberId: userId }
    });

    if (!sundayTreat) {
      throw new AppError('The Request seems not associated with you', 403);
    }

    await this.prisma.sundayTreat.delete({
      where: { id: id }
    });

    return {
      success: true
    }
  }
}

export default SundayTreatService;
