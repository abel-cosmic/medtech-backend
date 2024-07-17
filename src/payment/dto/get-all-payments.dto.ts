import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class GetAllPaymentsDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.PaymentWhereUniqueInput;

  @IsOptional()
  where?: Prisma.PaymentWhereInput;

  @IsOptional()
  orderBy?: Prisma.PaymentOrderByWithRelationInput;
}
