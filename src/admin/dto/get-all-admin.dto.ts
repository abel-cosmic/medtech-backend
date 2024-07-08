import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllAdminsDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.AdminWhereUniqueInput;

  @IsOptional()
  where?: Prisma.AdminWhereInput;

  @IsOptional()
  orderBy?: Prisma.AdminOrderByWithRelationInput;
}
