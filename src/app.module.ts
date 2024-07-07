import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { SystemLogModule } from './system-log/system-log.module';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SystemLogModule,
    PrismaModule,
    UserModule,
    AuthModule,
    BranchModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
