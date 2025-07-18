import { PrismaClient } from "@prisma/client/edge";
import { createToken, hashPassword } from "../utils/auth";
import { AppError } from "../utils/errors";

export class AdminService {
  constructor(private prisma: PrismaClient, private jwtSecret: string) {}

  async promoteToLeader(userId: string): Promise<{success: string}> {
    const member = await this.prisma.member.findUnique({
      where: { id: userId }
    });

    if (!member) {
      throw new AppError('Member not found', 400, 'MEMBER_NOT_FOUND');
    }

    await this.prisma.member.update({
      where: { id: userId },
      data: { role: 'LEADER' }
    });

    return {
      success: `Promoted ${member.name} to LEADER`
    };
  }

  async demoteLeader(userId: string): Promise<{success: string}> {
    const member = await this.prisma.member.findUnique({
      where: { id: userId }
    });

    if (!member) {
      throw new Error('There is no existing user with the mentioned ID');
    }

    await this.prisma.member.update({
      where: { id: userId },
      data: { role: 'MEMBER' }
    });

    return {
      success: `Demoted ${member.name} to MEMBER`
    }
  }

  async createAdmin(data: {
    name: string;
    username: string;
    password: string;
    phone: string;
    createdBy: string;
  }): Promise<AuthResponse> {
    const creator = await this.prisma.member.findUnique({
      where: { id: data.createdBy }
    });

    if (!creator || creator.role !== 'SUPER_ADMIN') {
      throw new Error('Only super admins can create admins')
    }

    const { name, username, phone, password } = data;
    const hashedPassword = await hashPassword(password);
    
    const member = await this.prisma.member.create({
      data: {
        name,
        password: hashedPassword,
        phone, 
        username,
        role: 'ADMIN'
      }
    });

    const token = await createToken(
      {
        userId: member.id,
        phone: member.phone,
        role: 'ADMIN'
      },
      this.jwtSecret
    );
        
    return {
      user: {
        id: member.id,
        name: member.name,
        phone: member.phone,
        username: member.username!,
        role: member.role
      },
      token
    };
  }
}
