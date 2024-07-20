import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class GetAllFormsDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.FormWhereUniqueInput;

  @IsOptional()
  where?: Prisma.FormWhereInput;

  @IsOptional()
  orderBy?: Prisma.FormOrderByWithRelationInput;
}
