import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number): Promise<{ message: string; data: Branch }> {
    const existingBranch = await this.prisma.branch.findUnique({
      where: { id },
    });
    if (!existingBranch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return {
      message: 'Branch retrieved successfully',
      data: existingBranch,
    };
  }

  async update(
    id: number,
    data: UpdateBranchDto,
  ): Promise<{ message: string; data: Branch }> {
    const updatedBranch = await this.prisma.branch.update({
      where: { id },
      data,
    });

    if (!updatedBranch) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }

    return {
      message: `Branch with ID ${id} updated successfully`,
      data: updatedBranch,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const deletedBranch = await this.prisma.branch.findUnique({
      where: { id },
    });
    if (!deletedBranch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    await this.prisma.branch.delete({
      where: { id },
    });
    return {
      message: 'Branch deleted successfully',
    };
  }
}
