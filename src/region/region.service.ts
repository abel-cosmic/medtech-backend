import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Region } from '@prisma/client';

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

  findAll() {
    return `This action returns all region`;
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
