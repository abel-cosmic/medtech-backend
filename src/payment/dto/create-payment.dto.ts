import { Optional } from '@nestjs/common';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  adminId: number;

  @IsNumber()
  @Optional()
  fillerId?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Optional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  madeBy: string;

  @IsString()
  @IsNotEmpty()
  madeTo: string;

  @IsString()
  @Optional()
  accountNumber?: string;

  @IsString()
  @Optional()
  referenceNumber?: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  method: PaymentMethod;

  @IsDate()
  @Optional()
  startDate?: Date;

  @IsDate()
  @Optional()
  endDate?: Date;
}

export enum PaymentMethod {
  CASH = 'CASH',
  BANKING = 'BANKING',
}
