import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.filesService.uploadFile(file);
    return { url: fileUrl };
  }
}

// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { FileUploadService } from './file-upload.service';

// @Controller('file-upload')
// export class FileUploadController {
//   constructor(private readonly fileUploadService: FileUploadService) {}

//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadFile(@UploadedFile() file: Express.Multer.File) {
//     const url = await this.fileUploadService.uploadFile(file);
//     return { url };
//   }
// }
