import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Region } from '@prisma/client';
import { GetAllRegionsDto } from './dto/get-all-region.dto';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateRegionDto,
  ): Promise<{ message: string; data: Region }> {
    const newRegion = await this.prisma.region.create({
      data,
    });
    return {
      message: 'Region created successfully',
      data: newRegion,
    };
  }

  async findAll(
    params?: GetAllRegionsDto,
  ): Promise<{ message: string; data: Region[] }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};
    // Parse skip and take as integers
    const skipInt = parseInt(skip as string, 10) || 0 || 0;
    const takeInt = parseInt(take as string, 10) || 10 || 0;

    const regions = await this.prisma.region.findMany({
      skip: skipInt,
      take: takeInt,
      cursor,
      where,
      orderBy,
    });

    return {
      message: 'Regions retrieved successfully',
      data: regions,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} region`;
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
