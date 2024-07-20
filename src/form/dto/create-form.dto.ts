import { Optional } from '@nestjs/common';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFormDto {
  @IsNumber()
  @IsNotEmpty()
  dataEncoderId!: number;

  @IsNumber()
  @IsNotEmpty()
  regionId!: number;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  middleName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  firstNameAm!: string;

  @IsString()
  @IsNotEmpty()
  middleNameAm!: string;

  @IsString()
  @IsNotEmpty()
  lastNameAm!: string;

  @IsString()
  @IsNotEmpty()
  birthDate!: string;

  @IsString()
  @IsNotEmpty()
  birthPlace!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  birthCertificate!: string;

  @IsString()
  @IsNotEmpty()
  identification!: string;

  @IsString()
  @IsNotEmpty()
  status!: FormStatus;

  @IsNumber()
  @IsNotEmpty()
  totalPrice!: number;

  @IsNumber()
  @IsNotEmpty()
  brokerCost!: number;

  @IsNumber()
  @IsNotEmpty()
  remainingPrice!: number;

  @IsString()
  @IsNotEmpty()
  issueDate!: string;

  @IsString()
  @IsNotEmpty()
  submissionDate!: string;
}
export enum FormStatus {
  NOTFILLED = 'NOTFILLED',
  ASSIGNED = 'ASSIGNED',
  FILLED = 'FILLED',
  PAID = 'PAID',
}
