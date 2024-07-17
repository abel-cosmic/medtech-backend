import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Payment } from '@prisma/client';
import { GetAllPaymentsDto } from './dto/get-all-payments.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreatePaymentDto): Promise<{
    message: string;
    data: Payment;
  }> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: data.adminId },
    });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${data.adminId} not found`);
    }
    const newPayment = await this.prisma.payment.create({
      data,
    });
    return {
      message: 'Payment created successfully',
      data: newPayment,
    };
  }

  async findAll(params?: GetAllPaymentsDto): Promise<{
    message: string;
    data: Payment[];
  }> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params || {};
    // Parse skip and take as integers
    const skipInt = parseInt(skip as string, 10) || 0 || 0;
    const takeInt = parseInt(take as string, 10) || 10 || 0;

    const payments = await this.prisma.payment.findMany({
      skip: skipInt,
      take: takeInt,
      cursor,
      where,
      orderBy,
    });

    return {
      message: 'Payments retrieved successfully',
      data: payments,
    };
  }

  async findOne(id: number): Promise<{
    message: string;
    data: Payment;
  }> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return {
      message: 'Payment retrieved successfully',
      data: payment,
    };
  }

  async update(
    id: number,
    data: UpdatePaymentDto,
  ): Promise<{
    message: string;
    data: Payment;
  }> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: data.adminId },
    });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${data.adminId} not found`);
    }
    const updatedPayment = await this.prisma.payment.update({
      where: { id },
      data,
    });

    if (!updatedPayment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return {
      message: 'This action updates a payment',
      data: updatedPayment,
    };
  }
  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
