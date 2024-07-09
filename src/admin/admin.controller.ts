import {
  Controller,
  Get,
  Param,
  // UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from '@prisma/client';
import { GetAllAdminsDto } from './dto/get-all-admin.dto';
// import { UserType } from '@/auth/user-type.decorator';
// import { UserTypeGuard } from '@/auth/user-type.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get()
  findAll(@Query() params?: GetAllAdminsDto): Promise<{
    message: string;
    data: Admin[];
  }> {
    return this.adminService.findAll(params);
  }
  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }
}
