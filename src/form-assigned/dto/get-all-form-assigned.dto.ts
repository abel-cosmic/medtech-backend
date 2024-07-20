import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class GetAllFormAssignedsDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.FormAssignedWhereUniqueInput;

  @IsOptional()
  where?: Prisma.FormAssignedWhereInput;

  @IsOptional()
  orderBy?: Prisma.FormAssignedOrderByWithRelationInput;
}
