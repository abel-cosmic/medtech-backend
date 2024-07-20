import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { FormAssignedService } from './form-assigned.service';
import { CreateFormAssignedDto } from './dto/create-form-assigned.dto';
import { UpdateFormAssignedDto } from './dto/update-form-assigned.dto';
import { FormAssigned } from '@prisma/client';
import { GetAllFormAssignedsDto } from './dto/get-all-form-assigned.dto';

@Controller('form-assigned')
export class FormAssignedController {
  constructor(private readonly formAssignedService: FormAssignedService) {}

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() data: CreateFormAssignedDto): Promise<{
    message: string;
    data: FormAssigned;
  }> {
    return this.formAssignedService.create(data);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get()
  findAll(@Query() params?: GetAllFormAssignedsDto): Promise<{
    message: string;
    data: FormAssigned[];
  }> {
    return this.formAssignedService.findAll(params);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formAssignedService.findOne(+id);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormAssignedDto: UpdateFormAssignedDto,
  ): Promise<{
    message: string;
    data: FormAssigned;
  }> {
    return this.formAssignedService.update(+id, updateFormAssignedDto);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formAssignedService.remove(+id);
  }
  // @Get('/filler/:fillerId')
  // async findByFillerId(
  //   @Param('fillerId') fillerId: string,
  //   @Query('status') status?: FormStatus,
  // ): Promise<{ message: string; data: FormAssigned[] }> {
  //   return this.formAssignedService.findByFillerId(+fillerId, status);
  // }

  // @Patch('/mark-done/:applicationNumber')
  // async markAsDone(
  //   @Param('applicationNumber') applicationNumber: string,
  // ): Promise<{ message: string; data: FormAssigned }> {
  //   return this.formAssignedService.markAsDone(applicationNumber);
  // }

  // @Patch('/mark-double/:applicationNumber')
  // async markAsDouble(
  //   @Param('applicationNumber') applicationNumber: string,
  // ): Promise<{ message: string; data: FormAssigned }> {
  //   return this.formAssignedService.markAsDouble(applicationNumber);
  // }

  // filter form assigned by filler id
  // filter form assigned by filler id by status as well
  // form assigned mark as done  and accept application number ( take it to the form application number update it status will be updated)
  // filled forms
  // mark as done ( status of form changed and formFilled status change)
  // mark as double ( status of the formFilled)
}
