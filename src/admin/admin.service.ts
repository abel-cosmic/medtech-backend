import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAllAdminsDto } from './dto/get-all-admin.dto';
import { Admin } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    params?: GetAllAdminsDto,
  ): Promise<{ message: string; data: Admin[] }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};
    // Parse skip and take as integers
    const skipInt = parseInt(skip as string, 10) || 0 || 0;
    const takeInt = parseInt(take as string, 10) || 10 || 0;

    const admins = await this.prisma.admin.findMany({
      skip: skipInt,
      take: takeInt,
      cursor,
      where,
      orderBy,
    });

    return {
      message: 'Admins retrieved successfully',
      data: admins,
    };
  }

  async findOne(id: number): Promise<{ message: string; data: Admin }> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    return {
      message: 'Admin retrieved successfully',
      data: admin,
    };
  }
}
