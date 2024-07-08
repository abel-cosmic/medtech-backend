import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllSystemLogsDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.SystemLogWhereUniqueInput;

  @IsOptional()
  where?: Prisma.SystemLogWhereInput;

  @IsOptional()
  orderBy?: Prisma.SystemLogOrderByWithRelationInput;
}
