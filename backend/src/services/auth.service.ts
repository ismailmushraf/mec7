import { PrismaClient } from "@prisma/client/edge";
import { hashPassword, verifyPassword, createToken } from "../utils/auth";
import { AuthResponse } from "@ismailmushraf/mec7";

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
}
