import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllSuperAdminsDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.SuperAdminWhereUniqueInput;

  @IsOptional()
  where?: Prisma.SuperAdminWhereInput;

  @IsOptional()
  orderBy?: Prisma.SuperAdminOrderByWithRelationInput;
}
