// src/form-assigned/dto/create-form-assigned.dto.ts
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
enum StatusType {
  NOTFILLED = 'NOTFILLED',
  FILLED = 'FILLED',
  PAYMENTPENDING = 'PAYMENTPENDING',
  PAID = 'PAID',
}
export class CreateFormAssignedDto {
  @IsNumber()
  @IsNotEmpty()
  readonly formId!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly fillerId!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly adminId!: number;

  @IsEnum(StatusType)
  @IsNotEmpty()
  readonly status!: StatusType;

  @IsString()
  @IsNotEmpty()
  readonly applicationNumber!: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly filledStatus!: boolean;
}
