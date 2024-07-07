import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userType: UserType;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
// user type enum value here
export enum UserType {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  DATAENCODER = 'DATAENCODER',
}
