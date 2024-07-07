import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { GetAllUsersDto } from './dto/get-all-user.dto';
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
    branchId?: number,
  ): Promise<{ message: string; data: UserWithoutPassword }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
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
    switch (userType) {
      case UserType.SUPERADMIN:
        await this.prisma.superAdmin.create({
          data: { userId: newUser.id },
        });
        break;
      case UserType.ADMIN:
        if (!branchId) {
          throw new BadRequestException(
            'branchId is required for ADMIN user type',
          );
        }
        await this.prisma.admin.create({
          data: { userId: newUser.id, branchId },
        });
        break;
      case UserType.DATAENCODER:
        if (!branchId) {
          throw new BadRequestException(
            'branchId is required for DATAENCODER user type',
          );
        }
        await this.prisma.dataEncoder.create({
          data: { userId: newUser.id, branchId },
        });
        break;
      default:
        throw new BadRequestException('Invalid user type');
    }

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }
  async getUserByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
  async findAll(params?: GetAllUsersDto): Promise<{
    message: string;
    data: UserWithoutPassword[];
  }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};

    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
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
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  async findOne(id: number): Promise<{
    message: string;
    data: UserWithoutPassword;
  }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
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
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      message: 'User retrieved Successfully',
      data: user,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
