import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Branch } from '@prisma/client';
import { GetAllBranchesDto } from './dto/get-all-branches.dto';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateBranchDto): Promise<{
    message: string;
    data: Branch;
  }> {
    const newBranch = await this.prisma.branch.create({
      data,
    });
    return {
      message: 'Branch created successfully',
      data: newBranch,
    };
  }

  async findAll(
    params?: GetAllBranchesDto,
  ): Promise<{ message: string; data: Branch[] }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};

    const branches = await this.prisma.branch.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return {
      message: 'Branches retrieved successfully',
      data: branches,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
