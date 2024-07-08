import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSystemLogDto } from './dto/create-system-log.dto';
import { UpdateSystemLogDto } from './dto/update-system-log.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { SystemLog } from '@prisma/client';
import { GetAllSystemLogsDto } from './dto/get-all-system-log.dto';

@Injectable()
export class SystemLogService {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateSystemLogDto,
  ): Promise<{ message: string; data: SystemLog }> {
    const newSystemLog = await this.prisma.systemLog.create({
      data,
    });
    return {
      message: 'SystemLog created successfully',
      data: newSystemLog,
    };
  }

  async findAll(
    params?: GetAllSystemLogsDto,
  ): Promise<{ message: string; data: SystemLog[] }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};
    // Parse skip and take as integers
    const skipInt = parseInt(skip as string, 10) || 0 || 0;
    const takeInt = parseInt(take as string, 10) || 10 || 0;

    const systemLogs = await this.prisma.systemLog.findMany({
      skip: skipInt,
      take: takeInt,
      cursor,
      where,
      orderBy,
    });

    return {
      message: 'SystemLogs retrieved successfully',
      data: systemLogs,
    };
  }
  async findOne(id: number): Promise<{ message: string; data: SystemLog }> {
    const systemLog = await this.prisma.systemLog.findUnique({
      where: { id },
    });
    if (!systemLog) {
      throw new NotFoundException(`System Log with ID ${id} not found`);
    }

    return {
      message: 'SystemLog retrieved successfully',
      data: systemLog,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const deletedSystemLog = await this.prisma.systemLog.findUnique({
      where: { id },
    });
    if (!deletedSystemLog) {
      throw new NotFoundException(`System Log with ID ${id} not found`);
    }
    await this.prisma.systemLog.delete({
      where: { id },
    });
    return {
      message: 'SystemLog deleted successfully',
    };
  }
}
