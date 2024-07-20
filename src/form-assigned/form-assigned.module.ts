import { Module } from '@nestjs/common';
import { FormAssignedService } from './form-assigned.service';
import { FormAssignedController } from './form-assigned.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [FormAssignedController],
  providers: [FormAssignedService],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
  ],
})
export class FormAssignedModule {}
