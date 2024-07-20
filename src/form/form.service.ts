import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { GetAllFormsDto } from './dto/get-all-form.dto';

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateFormDto): Promise<{
    message: string;
    data: Form;
  }> {
    const newForm = await this.prisma.form.create({
      data: data,
    });
    return {
      message: 'Form created successfully',
      data: newForm,
    };
  }

  async findAll(params?: GetAllFormsDto): Promise<{
    message: string;
    data: Form[];
  }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};
    // Parse skip and take as integers
    const skipInt = parseInt(skip as string, 10) || 0;
    const takeInt = parseInt(take as string, 10) || 10;

    const forms = await this.prisma.form.findMany({
      skip: skipInt,
      take: takeInt,
      cursor,
      where,
      orderBy,
    });

    return {
      message: 'Forms retrieved successfully',
      data: forms,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
