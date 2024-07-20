import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormAssignedService } from './form-assigned.service';
import { CreateFormAssignedDto } from './dto/create-form-assigned.dto';
import { UpdateFormAssignedDto } from './dto/update-form-assigned.dto';

@Controller('form-assigned')
export class FormAssignedController {
  constructor(private readonly formAssignedService: FormAssignedService) {}

  @Post()
  create(@Body() createFormAssignedDto: CreateFormAssignedDto) {
    return this.formAssignedService.create(createFormAssignedDto);
  }

  @Get()
  findAll() {
    return this.formAssignedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formAssignedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormAssignedDto: UpdateFormAssignedDto) {
    return this.formAssignedService.update(+id, updateFormAssignedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formAssignedService.remove(+id);
  }
}
