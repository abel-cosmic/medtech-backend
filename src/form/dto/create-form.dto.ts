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
  @Type(() => Date)
  @IsNotEmpty()
  birthDate!: Date;

  @IsString()
  @IsNotEmpty()
  birthPlace!: string;

  @IsString()
  @IsNotEmpty()
  readonly city!: string;

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
