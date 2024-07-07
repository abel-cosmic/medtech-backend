import { Injectable, NotAcceptableException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private readonly organizationService: OrganizationService,
    // private readonly studentService: StudentService,
    private readonly jtwService: JwtService,
  ) {}
  // async validateOrgUser(email: string, password: string): Promise<any> {
  //   const user = await this.organizationService.getUserByEmail(email);
  //   const passwordValid = await bcrypt.compare(password, user.password);
  //   if (!user) {
  //     throw new NotAcceptableException('could not find the organization');
  //   }
  //   if (user && passwordValid) {
  //     return {
  //       role: 'organization',
  //       id: user.id,
  //       email: user.email,
  //     };
  //   }
  //   return null;
  // }

  async orgLogin(user: any) {
    const payload = { email: user.email, sub: user.id, role: 'organization' };
    return {
      user,
      token: this.jtwService.sign(payload),
    };
  }
  // async validateStuUser(email: string, password: string): Promise<any> {
  //   const user = await this.studentService.getUserByEmail(email);
  //   const passwordValid = await bcrypt.compare(password, user.password);
  //   if (!user) {
  //     throw new NotAcceptableException('could not find the student');
  //   }
  //   if (user && passwordValid) {
  //     return {
  //       role: 'student',
  //       id: user.id,
  //       email: user.email,
  //     };
  //   }
  //   return null;
  // }

  async stuLogin(user: any) {
    const payload = { email: user.email, sub: user.id, role: 'student' };
    return {
      user,
      token: this.jtwService.sign(payload),
    };
  }
}
