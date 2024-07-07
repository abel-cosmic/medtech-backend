import { Optional } from '@nestjs/common';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSystemLogDto {
  @IsString()
  @IsNotEmpty()
  readonly action!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId!: number;

  @Optional()
  @IsString()
  readonly details?: string;

  @IsString()
  @IsNotEmpty()
  readonly timestamp!: Date;
}
