import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemLogModule } from './system-log/system-log.module';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SystemLogModule, PrismaModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
