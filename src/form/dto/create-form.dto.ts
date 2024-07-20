import { Optional } from '@nestjs/common';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFormDto {
  @IsNumber()
  @IsNotEmpty()
  readonly dataEncoderId!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly regionId!: number;

  @IsString()
  @IsNotEmpty()
  readonly firstName!: string;

  @IsString()
  @IsNotEmpty()
  readonly middleName!: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName!: string;

  @IsString()
  @IsNotEmpty()
  readonly firstNameAm!: string;

  @IsString()
  @IsNotEmpty()
  readonly middleNameAm!: string;

  @IsString()
  @IsNotEmpty()
  readonly lastNameAm!: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthDate!: Date;

  @IsString()
  @IsNotEmpty()
  readonly birthPlace!: string;

  @IsString()
  @IsNotEmpty()
  readonly city!: string;

  @IsString()
  @IsNotEmpty()
  readonly birthCertificate!: string;

  @IsString()
  @IsNotEmpty()
  readonly identification!: string;

  @IsString()
  @IsNotEmpty()
  readonly status!: FormStatus;

  @IsNumber()
  @IsNotEmpty()
  readonly totalPrice!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly brokerCost!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly remainingPrice!: number;

  @IsDate()
  @IsNotEmpty()
  readonly issueDate!: Date;

  @IsDate()
  @IsNotEmpty()
  readonly submissionDate!: Date;
}
export enum FormStatus {
  NOTFILLED = 'NOTFILLED',
  ASSIGNED = 'ASSIGNED',
  FILLED = 'FILLED',
  PAID = 'PAID',
}
