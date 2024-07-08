import { PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  branchName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  branchLocation?: string;
}
