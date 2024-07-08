import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllBranchesDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.BranchWhereUniqueInput;

  @IsOptional()
  where?: Prisma.BranchWhereInput;

  @IsOptional()
  orderBy?: Prisma.BranchOrderByWithRelationInput;
}
