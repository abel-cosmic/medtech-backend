import {
  Controller,
  Post,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  UploadedFiles,
  UseInterceptors,
  Req,
  BadRequestException,
  Get,
  Body,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from '@prisma/client';
import { GetAllFormsDto } from './dto/get-all-form.dto';
import { Request } from 'express';
import { FileUploadService } from '@/file-upload/file-upload.service';

@Controller('form')
export class FormController {
  constructor(
    private readonly formService: FormService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(
    FileUploadService.getFileInterceptor((req, file, callback) => {
      if (!file.originalname.match(/\.(pdf|jpg|jpeg|png)$/)) {
        return callback(
          new BadRequestException('Only PDF and image files are allowed'),
          false,
        );
      }
      callback(null, true);
    }),
  )
  async create(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const formData = await this.fileUploadService.handleFormData(req);

    // Parsing the form data to match CreateFormDto structure
    const createFormDto = new CreateFormDto();
    Object.assign(createFormDto, formData);

    if (files.length !== 2) {
      throw new BadRequestException(
        'Two files are required: birthCertificate and identification',
      );
    }

    const [birthCertificateFile, identificationFile] = files;

    createFormDto.birthCertificate = birthCertificateFile.path;
    createFormDto.identification = identificationFile.path;

    console.log('Files:', files);
    console.log('Form Data:', createFormDto);

    const result = await this.formService.create(createFormDto);

    return {
      message: 'Files and form data uploaded successfully',
      data: result,
    };
  }
  @Get()
  findAll(@Query() params?: GetAllFormsDto): Promise<{
    message: string;
    data: Form[];
  }> {
    return this.formService.findAll(params);
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param('id') id: string): Promise<{
    message: string;
    data: Form;
  }> {
    return this.formService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(+id, updateFormDto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(+id);
  }
}
