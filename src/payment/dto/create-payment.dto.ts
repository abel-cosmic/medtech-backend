import { Optional } from '@nestjs/common';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  adminId: number;

  @IsNumber()
  @IsOptional()
  fillerId?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  madeBy: string;

  @IsString()
  @IsNotEmpty()
  madeTo: string;

  @IsString()
  @IsOptional()
  accountNumber?: string;

  @IsString()
  @IsOptional()
  referenceNumber?: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  method: PaymentMethod;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export enum PaymentMethod {
  CASH = 'CASH',
  BANKING = 'BANKING',
}
