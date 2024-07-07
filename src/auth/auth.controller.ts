import { Controller, Get, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  /**
   * Logs out the current user by destroying the session.
   * @param req - The HTTP request containing the session information.
   * @returns A message indicating that the user session has ended.
   */
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
