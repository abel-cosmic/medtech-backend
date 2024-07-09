import { Module } from '@nestjs/common';
import { DataEncoderService } from './data-encoder.service';
import { DataEncoderController } from './data-encoder.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [DataEncoderController],
  providers: [DataEncoderService, PrismaService],
})
export class DataEncoderModule {}
