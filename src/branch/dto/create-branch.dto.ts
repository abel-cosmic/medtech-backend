import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  readonly branchName!: string;

  @IsString()
  @IsNotEmpty()
  readonly branchLocation!: string;
}
