import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const multerConfig = (
  fileFilter?: (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => void,
) => ({
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
      callback(null, uniqueSuffix);
    },
  }),
  fileFilter:
    fileFilter ||
    ((req, file, callback) => {
      // Default file filter if none is provided
      if (!file.originalname.match(/\.(pdf|jpg|jpeg|png)$/)) {
        return callback(
          new BadRequestException('Only PDF and image files are allowed'),
          false,
        );
      }
      callback(null, true);
    }),
});
