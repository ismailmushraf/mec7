import { PrismaClient, Role } from "@prisma/client/edge";
import { hashPassword, verifyPassword, createToken } from "../utils/auth";

interface AuthResponse {
  user: {
    id: string;
    name: string;
    phone?: string
    username?: string;
    role: Role;
  };
  token: string;
}

export class AuthService {
  constructor(private prisma: PrismaClient, private jwtSecret: string) {}

  // universal registration
  async register(data: {
    name: string;
    password: string;
    phone: string;
  }): Promise<AuthResponse> {
    const { name, password, phone } = data;


    const existingUser = await this.prisma.member.findFirst({
      where: { phone }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    
    const member = await this.prisma.member.create({
      data: {
        name,
        password: hashedPassword,
        phone, 
        role: 'MEMBER'
      }
    });

    const token = await createToken(
      {
        userId: member.id,
        phone: member.phone,
        role: 'MEMBER'
      },
      this.jwtSecret
    );
        
    return {
      user: {
        id: member.id,
        name: member.name,
        phone: member.phone,
        role: member.role
      },
      token
    };
  }

  async login(identifier: string, password: string): Promise<AuthResponse> {
    const isPhone = /^\d+$/.test(identifier);

    const member = await this.prisma.member.findFirst({
      where: isPhone ? { phone: identifier } : { username: identifier }
    });

    if (!member || !member.password) {
      throw new Error("Invalid credentials");
    }

    const isValid = await verifyPassword(password, member.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = await createToken(
      {
        userId: member.id,
        role: member.role,
        phone: member.phone
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

  async promoteToLeader(userId: string, promotedBy: string): Promise<{success: string}> {
    const promoter = await this.prisma.member.findUnique({
      where: { id: promotedBy }
    });

    if (!promoter || (promoter.role !== 'ADMIN' && promoter.role !== 'SUPER_ADMIN')) {
      throw new Error('Unauthorized to promote members');
    }

    const member = await this.prisma.member.findUnique({
      where: { id: userId }
    });

    if (!member) {
      throw new Error('There is no existing user with the mentioned ID');
    }

    await this.prisma.member.update({
      where: { id: userId },
      data: { role: 'LEADER' }
    });

    return {
      success: `Promoted ${member.name} to LEADER`
    };
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
        role: 'MEMBER'
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
