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
import { RolesGuard } from '@/auth/roles.guard';
import { Roles } from '@/auth/roles.decorator';
import { SystemLog } from '@prisma/client';
import { GetAllSystemLogsDto } from './dto/get-all-system-log.dto';

@Controller('system-log')
export class SystemLogController {
  constructor(private readonly systemLogService: SystemLogService) {}

  @UseGuards(RolesGuard)
  @Roles('SUPERADMIN')
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateSystemLogDto) {
    return this.systemLogService.create(data);
  }

  @UseGuards(RolesGuard)
  @Roles('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get()
  findAll(@Query() params?: GetAllSystemLogsDto): Promise<{
    message: string;
    systemLog: SystemLog[];
  }> {
    return this.systemLogService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemLogService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles('SUPERADMIN')
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateSystemLogDto: UpdateSystemLogDto,
  ) {
    return this.systemLogService.update(+id, updateSystemLogDto);
  }

  @UseGuards(RolesGuard)
  @Roles('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemLogService.remove(+id);
  }
}
