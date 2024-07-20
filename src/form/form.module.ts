import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '@/middleware/multer';
import { FileUploadService } from '@/file-upload/file-upload.service';

@Module({
  controllers: [FormController],
  providers: [FormService, FileUploadService],
  imports: [
    PrismaModule,
    MulterModule.register(multerConfig()), // Remove the parentheses after multerConfig
  ],
})
export class FormModule {}
