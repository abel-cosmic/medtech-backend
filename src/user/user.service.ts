import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Prisma, User } from '@prisma/client';
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
    pricePerForm?: number,
  ): Promise<{ message: string; data: UserWithoutPassword }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Function to generate a unique filler code
    const generateUniqueFillerCode = async (): Promise<string> => {
      let fillerCode;
      let isUnique = false;
      while (!isUnique) {
        fillerCode = crypto.randomBytes(10).toString('hex');
        const existingCode = await this.prisma.user.findUnique({
          where: { fillerCode },
        });
        if (!existingCode) {
          isUnique = true;
        }
      }
      return fillerCode;
    };

    let fillerCode = null;
    if (userType === UserType.FILLER) {
      if (!pricePerForm) {
        throw new BadRequestException(
          'Price per form is required for FILLER user type',
        );
      }

      fillerCode = await generateUniqueFillerCode();
    }

    const newUser = await this.prisma.user.create({
      data: {
        userType,
        firstName,
        lastName,
        username,
        phoneNumber,
        password: hashedPassword,
        fillerCode,
        pricePerForm,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        userType: true,
        firstName: true,
        lastName: true,
        username: true,
        fillerCode: userType === UserType.FILLER,
        pricePerForm: userType === UserType.FILLER,
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
        await this.prisma.admin.create({
          data: { userId: newUser.id },
        });
        break;
      case UserType.DATAENCODER:
        await this.prisma.dataEncoder.create({
          data: { userId: newUser.id },
        });
        break;
      case UserType.FILLER:
        if (!pricePerForm) {
          throw new BadRequestException(
            'Price per form is required for FILLER user type',
          );
        }
        await this.prisma.filler.create({
          data: { userId: newUser.id } as unknown as Prisma.FillerCreateInput,
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
    // Parse skip and take as integers
    const skipInt = parseInt(skip as string, 10) || 0 || 0;
    const takeInt = parseInt(take as string, 10) || 10 || 0;

    const users = await this.prisma.user.findMany({
      skip: skipInt,
      take: takeInt,
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
        fillerCode: true,
        pricePerForm: true,
      },
    });

    return {
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  async findOne(id: number): Promise<UserWithoutPassword> {
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
        fillerCode: true,
        pricePerForm: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{
    message: string;
    data: UserWithoutPassword;
  }> {
    // Fetch the existing user
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if the user is an admin or a data encoder
    const [existingAdmin, existingDataEncoder] = await Promise.all([
      this.prisma.admin.findFirst({
        where: { userId: id },
      }),
      this.prisma.dataEncoder.findFirst({
        where: { userId: id },
      }),
    ]);

    // Update user details
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
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
        fillerCode: true,
        pricePerForm: true,
      },
    });

    return {
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const deletedUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.prisma.superAdmin.deleteMany({
      where: { userId: id },
    });
    await this.prisma.admin.deleteMany({
      where: { userId: id },
    });

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'User deleted successfully',
    };
  }

  async findAllByType(
    userType: UserType,
  ): Promise<{ message: string; data: UserWithoutPassword[] }> {
    // Validate if the provided userType is valid
    if (!Object.values(UserType).includes(userType)) {
      throw new BadRequestException('Invalid user type');
    }

    const users = await this.prisma.user.findMany({
      where: {
        userType: userType,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        userType: true,
        firstName: true,
        lastName: true,
        username: true,
        fillerCode: true,
        pricePerForm: true,
        phoneNumber: true,
        password: false,
      },
    });

    return {
      message: `Users with type ${userType} retrieved successfully`,
      data: users,
    };
  }
}
