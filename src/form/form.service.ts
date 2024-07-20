import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

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

  findAll() {
    return `This action returns all form`;
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
