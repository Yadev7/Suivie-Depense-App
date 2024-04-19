import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateDepensetDto } from 'src/depenses/dtos/CreateDepense.dto';
import { DepensesService } from 'src/depenses/services/depenses/depenses.service';
import * as fs from 'fs';

@Controller('depenses')
export class DepensesController {
  constructor(private readonly depensesService: DepensesService) {}

  @Get()
  getDepenses() {
    return this.depensesService.fetchDepense();
  }

  @Get(':id')
  async getDepenseById(@Param('id', ParseIntPipe) id: number) {
    return this.depensesService.getDepenseById(id);
  }

  @Post()
  async createDepense(@Body() createDepenseDto: CreateDepensetDto) {
    await this.depensesService.createDepense(createDepenseDto);
    return await this.getDepenses();
  }

  @Delete(':id')
  async deleteDepenseById(@Param('id', ParseIntPipe) id: number) {
    await this.depensesService.deleteDepense(id);
  }

  @Put(':id')
  async updateDepenseById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDepenseDto: CreateDepensetDto,
  ) {
    await this.depensesService.updateDepense(id, createDepenseDto);
    return this.getDepenses();
  }

  @Post('upload')
  @UseInterceptors(
       FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          let folder = './fichiers';
          if (req.query) {
            if (req.query.type) {
              if (req.query.type == 'rep') {
                if (req.query.folder && req.query.folder != '') {
                  folder += '/' + req.query.folder;
                  !fs.existsSync(folder) &&
                    fs.mkdirSync(folder, { recursive: true });
                }
              }
            }
          }
          callback(null, `${folder}`);
        },
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )

  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      status: 'success',
      message: 'Files uploaded successfully',
      data: files,
    };
  }

  @Post('record')
  @UseInterceptors(FileInterceptor('audio', {
    storage: diskStorage({
      destination: './fichiers', // Define your upload directory
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))

  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { 
      status: 'success',
      message: 'Audio record uploaded successfully',
      filePath: file.path,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,  
      encoding: file.encoding,
      fieldname: file.fieldname,
      destination: file.destination,
      buffer: file.buffer,
      stream: file.stream,
      };
  }



  // uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   return {
  //     status: 'success',
  //     message: 'Files uploaded successfully',
  //     data: files,
  //   };
  // }
}
