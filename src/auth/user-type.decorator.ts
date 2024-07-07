import { SetMetadata } from '@nestjs/common';

export const USERTYPE_KEY = 'userType';
export const UserType = (...userType: string[]) =>
  SetMetadata(USERTYPE_KEY, userType);
