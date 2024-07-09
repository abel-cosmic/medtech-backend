import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { GetAllSuperAdminsDto } from './dto/get-all-super-admin.dto';
import { SuperAdmin } from '@prisma/client';

@Injectable()
export class SuperAdminService {
  constructor(private prisma: PrismaService) {}
  async findAll(
    params?: GetAllSuperAdminsDto,
  ): Promise<{ message: string; data: SuperAdmin[] }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};
    // Parse skip and take as integers
    const skipInt = parseInt(skip as string, 10) || 0 || 0;
    const takeInt = parseInt(take as string, 10) || 10 || 0;

    const superAdmins = await this.prisma.superAdmin.findMany({
      skip: skipInt,
      take: takeInt,
      cursor,
      where,
      orderBy,
      include: { user: true },
    });

    return {
      message: 'Super Admins retrieved successfully',
      data: superAdmins,
    };
  }

  async findOne(id: number): Promise<{ message: string; data: SuperAdmin }> {
    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!superAdmin) {
      throw new NotFoundException(`Super Admin with ID ${id} not found`);
    }

    return {
      message: 'Super Admin retrieved successfully',
      data: superAdmin,
    };
  }
}
