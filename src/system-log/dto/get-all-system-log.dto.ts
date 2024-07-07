import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAllSystemLogsDto {
  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsNumber()
  take?: number;

  @IsOptional()
  cursor?: Prisma.SystemLogWhereUniqueInput;

  @IsOptional()
  where?: Prisma.SystemLogWhereInput;

  @IsOptional()
  orderBy?: Prisma.SystemLogOrderByWithRelationInput;
}
