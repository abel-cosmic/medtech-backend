import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { GetAllFormsDto } from './dto/get-all-form.dto';

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateFormDto): Promise<Form> {
    const newForm = await this.prisma.form.create({
      data: data,
    });
    return newForm;
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

  async findOne(id: number): Promise<{
    message: string;
    data: Form;
  }> {
    const form = await this.prisma.form.findUnique({
      where: { id },
    });
    if (!form) {
      throw new NotFoundException(`Form with ID ${id} not found`);
    }
    return {
      message: 'Form retrieved successfully',
      data: form,
    };
  }

  async update(id: number, data: UpdateFormDto): Promise<Form> {
    // Update a form entry by ID
    const form = await this.prisma.form.update({
      where: { id },
      data,
    });
    if (!form) {
      throw new NotFoundException(`Form with ID ${id} not found`);
    }
    return form;
  }

  async remove(id: number): Promise<{ message: string }> {
    // Delete a form entry by ID
    const form = await this.prisma.form.delete({
      where: { id },
    });
    if (!form) {
      throw new NotFoundException(`Form with ID ${id} not found`);
    }
    return {
      message: `Form with ID ${id} deleted successfully`,
    };
  }
}
