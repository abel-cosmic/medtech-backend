import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  // UseGuards,
} from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdmin } from '@prisma/client';
import { GetAllSuperAdminsDto } from './dto/get-all-super-admin.dto';

// import { UserType } from '@/auth/user-type.decorator';
// import { UserTypeGuard } from '@/auth/user-type.guard';
@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get()
  findAll(@Query() params?: GetAllSuperAdminsDto): Promise<{
    message: string;
    data: SuperAdmin[];
  }> {
    return this.superAdminService.findAll(params);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superAdminService.findOne(+id);
  }
}
