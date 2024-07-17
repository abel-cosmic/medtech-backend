import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { SystemLogModule } from './system-log/system-log.module';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { DataEncoderModule } from './data-encoder/data-encoder.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SystemLogModule,
    PrismaModule,
    UserModule,
    AuthModule,
    AdminModule,
    DataEncoderModule,
    SuperAdminModule,
    PaymentModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
