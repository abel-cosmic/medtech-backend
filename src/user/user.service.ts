import { BadRequestException, Injectable } from '@nestjs/common';
import { UserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
type UserWithoutPassword = Omit<User, 'password'>;
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    userType: UserType,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    password: string,
  ): Promise<{ message: string; data: UserWithoutPassword }> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        userType,
        firstName,
        lastName,
        username,
        phoneNumber,
        password: hashedPassword,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        userType: true,
        firstName: true,
        lastName: true,
        username: true,
        phoneNumber: true,
        password: false,
      },
    });
    return {
      message: 'User created',
      data: newUser,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
