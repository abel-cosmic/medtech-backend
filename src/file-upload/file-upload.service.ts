import { Injectable, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@/middleware/multer';

@Injectable()
export class FileUploadService {
  static getFileInterceptor(
    fileFilter?: (
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) => void,
  ) {
    return AnyFilesInterceptor(multerConfig(fileFilter));
  }

  async handleFormData(req: Request) {
    const formData = req.body;
    // Ensure numeric fields are converted from strings to numbers
    const data = {
      ...formData,
      dataEncoderId: Number(formData.dataEncoderId),
      regionId: Number(formData.regionId),
      totalPrice: Number(formData.totalPrice),
      brokerCost: Number(formData.brokerCost),
      remainingPrice: Number(formData.remainingPrice),
      birthDate: new Date(formData.birthDate),
      issueDate: new Date(formData.issueDate),
      submissionDate: new Date(formData.submissionDate),
    };

    // Ensure that all required fields are present
    if (!data.dataEncoderId || !data.regionId) {
      throw new BadRequestException('Missing required fields');
    }

    return data;
  }
}
