import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormAssignedDto } from './dto/create-form-assigned.dto';
import { UpdateFormAssignedDto } from './dto/update-form-assigned.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { FormAssigned } from '@prisma/client';
import { GetAllFormAssignedsDto } from './dto/get-all-form-assigned.dto';

@Injectable()
export class FormAssignedService {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateFormAssignedDto,
  ): Promise<{ message: string; data: FormAssigned }> {
    const newFormAssigned = await this.prisma.formAssigned.create({
      data,
    });
    return {
      message: 'FormAssigned created successfully',
      data: newFormAssigned,
    };
  }

  async findAll(
    params?: GetAllFormAssignedsDto,
  ): Promise<{ message: string; data: FormAssigned[] }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};
    // Parse skip and take as integers
    const skipInt = parseInt(skip as string, 10) || 0 || 0;
    const takeInt = parseInt(take as string, 10) || 10 || 0;

    const formAssigneds = await this.prisma.formAssigned.findMany({
      skip: skipInt,
      take: takeInt,
      cursor,
      where,
      orderBy,
    });

    return {
      message: 'FormAssigneds retrieved successfully',
      data: formAssigneds,
    };
  }

  async findOne(id: number): Promise<{ message: string; data: FormAssigned }> {
    const formAssigned = await this.prisma.formAssigned.findUnique({
      where: { id },
    });
    if (!formAssigned) {
      throw new NotFoundException(`FormAssigned with ID ${id} not found`);
    }
    return {
      message: 'FormAssigned retrieved successfully',
      data: formAssigned,
    };
  }

  update(id: number, updateFormAssignedDto: UpdateFormAssignedDto) {
    return `This action updates a #${id} formAssigned`;
  }

  remove(id: number) {
    return `This action removes a #${id} formAssigned`;
  }
}
