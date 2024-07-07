import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { USERTYPE_KEY } from './user-type.decorator';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userTypes = this.reflector.get<string[]>(
      USERTYPE_KEY,
      context.getHandler(),
    );
    if (!userTypes) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const decoded = this.jwtService.verify(token);
    const userType = decoded.userType;

    if (userTypes.includes(userType)) {
      return true;
    }

    throw new UnauthorizedException('You do not have the required UserType');
  }
}
