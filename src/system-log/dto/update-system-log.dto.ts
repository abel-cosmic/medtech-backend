import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemLogDto } from './create-system-log.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateSystemLogDto extends PartialType(CreateSystemLogDto) {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly action!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly details?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly timestamp!: Date;
}
