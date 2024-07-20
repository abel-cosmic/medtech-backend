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
import { RegionModule } from './region/region.module';
import { FormModule } from './form/form.module';
import { FileUploadService } from './file-upload/file-upload.service';

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
    RegionModule,
    FormModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, FileUploadService],
})
export class AppModule {}
