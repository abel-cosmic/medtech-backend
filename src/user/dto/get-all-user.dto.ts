import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllUsersDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.UserWhereUniqueInput;

  @IsOptional()
  where?: Prisma.UserWhereInput;

  @IsOptional()
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
