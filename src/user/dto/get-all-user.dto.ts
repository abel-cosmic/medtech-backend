import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAllUsersDto {
  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsNumber()
  take?: number;

  @IsOptional()
  cursor?: Prisma.UserWhereUniqueInput;

  @IsOptional()
  where?: Prisma.UserWhereInput;

  @IsOptional()
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
