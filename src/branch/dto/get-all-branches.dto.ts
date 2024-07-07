import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAllBranchesDto {
  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsNumber()
  take?: number;

  @IsOptional()
  cursor?: Prisma.BranchWhereUniqueInput;

  @IsOptional()
  where?: Prisma.BranchWhereInput;

  @IsOptional()
  orderBy?: Prisma.BranchOrderByWithRelationInput;
}
