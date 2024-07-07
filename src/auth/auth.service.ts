import { Injectable, NotAcceptableException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jtwService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the User');
    }
    if (user && passwordValid) {
      return {
        userType: user.userType,
        id: user.id,
        email: user.username,
      };
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      userType: user.userType,
    };
    return {
      user,
      token: this.jtwService.sign(payload),
    };
  }
}
