import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Req,
  Get,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from '@prisma/client';
import { GetAllFormsDto } from './dto/get-all-form.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads', // Adjust the destination as needed
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf|jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException('Only PDF and image files are allowed'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Extract form data from req.body
    const formData = req.body;

    // Parsing the form data to match CreateFormDto structure
    const createFormDto = new CreateFormDto();
    createFormDto.dataEncoderId = Number(formData.dataEncoderId);
    createFormDto.regionId = Number(formData.regionId);
    createFormDto.firstName = formData.firstName;
    createFormDto.middleName = formData.middleName;
    createFormDto.lastName = formData.lastName;
    createFormDto.firstNameAm = formData.firstNameAm;
    createFormDto.middleNameAm = formData.middleNameAm;
    createFormDto.lastNameAm = formData.lastNameAm;
    createFormDto.birthDate = formData.birthDate;
    createFormDto.birthPlace = formData.birthPlace;
    createFormDto.city = formData.city;
    createFormDto.status = formData.status;
    createFormDto.totalPrice = Number(formData.totalPrice);
    createFormDto.brokerCost = Number(formData.brokerCost);
    createFormDto.remainingPrice = Number(formData.remainingPrice);
    createFormDto.issueDate = formData.issueDate;
    createFormDto.submissionDate = formData.submissionDate;

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
  findOne(@Param('id') id: string) {
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
