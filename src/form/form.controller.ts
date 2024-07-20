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
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from '@prisma/client';
import { GetAllFormsDto } from './dto/get-all-form.dto';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @Post()
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() data: CreateFormDto) {
    return this.formService.create(data);
  }

  @Get()
  findAll(@Query() params?: GetAllFormsDto): Promise<{
    message: string;
    data: Form[];
  }> {
    return this.formService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(+id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(+id);
  }
}
