import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllRegionsDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.RegionWhereUniqueInput;

  @IsOptional()
  where?: Prisma.RegionWhereInput;

  @IsOptional()
  orderBy?: Prisma.RegionOrderByWithRelationInput;
}
