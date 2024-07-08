import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) {
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
      id: user.id,
      userType: user.userType,
    };
    console.log('payload', payload);
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
