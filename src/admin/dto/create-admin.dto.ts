import { IsInt } from 'class-validator';

export class CreateAdminDto {
  @IsInt()
  readonly userId!: number;

  @IsInt()
  readonly branchId!: number;
}
