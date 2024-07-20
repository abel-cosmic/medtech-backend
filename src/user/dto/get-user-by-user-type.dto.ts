import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from './create-user.dto';

export class GetUsersByTypeDto {
  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;
}
