import { Module } from '@nestjs/common';
import { SystemLogService } from './system-log.service';
import { SystemLogController } from './system-log.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '@/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [SystemLogController],
  providers: [SystemLogService, JwtService],
  imports: [PrismaModule, PassportModule],
})
export class SystemLogModule {}
