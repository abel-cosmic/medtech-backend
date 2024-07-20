import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum FormStatus {
  NOTFILLED = 'NOTFILLED',
  ASSIGNED = 'ASSIGNED',
  FILLED = 'FILLED',
  PAID = 'PAID',
}

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

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthDate!: Date;

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

  @IsEnum(FormStatus)
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

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  issueDate!: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  submissionDate!: Date;
}
