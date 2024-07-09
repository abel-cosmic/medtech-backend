import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { GetAllDataEncodersDto } from './dto/get-all-data-encoder.dto';
import { DataEncoder } from '@prisma/client';

@Injectable()
export class DataEncoderService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    params?: GetAllDataEncodersDto,
  ): Promise<{ message: string; data: DataEncoder[] }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};

    const skipInt = parseInt(skip as string, 10) || 0 || 0;
    const takeInt = parseInt(take as string, 10) || 10 || 0;

    const dataEncoders = await this.prisma.dataEncoder.findMany({
      skip: skipInt,
      take: takeInt,
      cursor,
      where,
      orderBy,
      include: { user: true },
    });

    return {
      message: 'DataEncoders retrieved successfully',
      data: dataEncoders,
    };
  }

  async findOne(id: number): Promise<{ message: string; data: DataEncoder }> {
    const dataEncoder = await this.prisma.dataEncoder.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!dataEncoder) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    return {
      message: 'DataEncoder retrieved successfully',
      data: dataEncoder,
    };
  }
}
