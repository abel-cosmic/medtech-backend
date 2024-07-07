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
  ): Promise<{ message: string; systemLog: SystemLog }> {
    const newSystemLog = await this.prisma.systemLog.create({
      data,
    });
    return {
      message: 'SystemLog created successfully',
      systemLog: newSystemLog,
    };
  }

  async findAll(
    params?: GetAllSystemLogsDto,
  ): Promise<{ message: string; systemLog: SystemLog[] }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};

    const systemLogs = await this.prisma.systemLog.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return {
      message: 'SystemLogs retrieved successfully',
      systemLog: systemLogs,
    };
  }
  async findOne(
    id: number,
  ): Promise<{ message: string; systemLog: SystemLog }> {
    const systemLog = await this.prisma.systemLog.findUnique({
      where: { id },
    });
    if (!systemLog) {
      throw new NotFoundException(`System Log with ID ${id} not found`);
    }

    return {
      message: 'SystemLog retrieved successfully',
      systemLog: systemLog,
    };
  }

  async update(
    id: number,
    updateSystemLogDto: UpdateSystemLogDto,
  ): Promise<{ message: string; systemLog: SystemLog }> {
    const updatedSystemLog = await this.prisma.systemLog.update({
      where: { id },
      data: updateSystemLogDto,
    });
    return {
      message: 'SystemLog updated successfully',
      systemLog: updatedSystemLog,
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
