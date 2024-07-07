import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { UserType } from '@/auth/user-type.decorator';
import { UserTypeGuard } from '@/auth/user-type.guard';
import { Branch } from '@prisma/client';
import { GetAllBranchesDto } from './dto/get-all-branches.dto';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @Post()
  create(@Body() data: CreateBranchDto) {
    return this.branchService.create(data);
  }

  @Get()
  findAll(@Query() params?: GetAllBranchesDto): Promise<{
    message: string;
    data: Branch[];
  }> {
    return this.branchService.findAll(params);
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
