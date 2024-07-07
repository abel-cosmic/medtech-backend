import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { SystemLogService } from './system-log.service';
import { CreateSystemLogDto } from './dto/create-system-log.dto';
import { UpdateSystemLogDto } from './dto/update-system-log.dto';
import { UserTypeGuard } from '@/auth/user-type.guard';
import { SystemLog } from '@prisma/client';
import { GetAllSystemLogsDto } from './dto/get-all-system-log.dto';
import { UserType } from '@/auth/user-type.decorator';

@Controller('system-log')
export class SystemLogController {
  constructor(private readonly systemLogService: SystemLogService) {}

  @UseGuards(UserTypeGuard)
  @UserType('SUPERADMIN')
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateSystemLogDto) {
    return this.systemLogService.create(data);
  }

  @UseGuards(UserTypeGuard)
  @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get()
  findAll(@Query() params?: GetAllSystemLogsDto): Promise<{
    message: string;
    data: SystemLog[];
  }> {
    return this.systemLogService.findAll(params);
  }

  @UseGuards(UserTypeGuard)
  @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemLogService.findOne(+id);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemLogService.remove(+id);
  }
}
