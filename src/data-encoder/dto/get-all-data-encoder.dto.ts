import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllDataEncodersDto {
  @IsOptional()
  @IsString()
  skip?: string;

  @IsOptional()
  @IsString()
  take?: string;

  @IsOptional()
  cursor?: Prisma.DataEncoderWhereUniqueInput;

  @IsOptional()
  where?: Prisma.DataEncoderWhereInput;

  @IsOptional()
  orderBy?: Prisma.DataEncoderOrderByWithRelationInput;
}
