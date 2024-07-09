import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // UseGuards,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { DataEncoderService } from './data-encoder.service';
import { GetAllDataEncodersDto } from './dto/get-all-data-encoder.dto';
import { DataEncoder } from '@prisma/client';
// import { UserType } from '@/auth/user-type.decorator';
// import { UserTypeGuard } from '@/auth/user-type.guard';

@Controller('data-encoder')
export class DataEncoderController {
  constructor(private readonly dataEncoderService: DataEncoderService) {}

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get()
  findAll(@Query() params?: GetAllDataEncodersDto): Promise<{
    message: string;
    data: DataEncoder[];
  }> {
    return this.dataEncoderService.findAll(params);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataEncoderService.findOne(+id);
  }
}
