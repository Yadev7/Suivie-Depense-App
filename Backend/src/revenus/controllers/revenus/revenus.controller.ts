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
  import { CreateRevenuDto } from 'src/revenus/dtos/CreateRevenu.dto';
  import { RevenusService } from 'src/revenus/services/revenus.service';
  import * as fs from 'fs';

@Controller('revenus')
export class RevenusController {
  constructor(private readonly revenusService: RevenusService) {}

  @Get()
  getRevenus() {
    return this.revenusService.fetchRevenus();
  }

  @Get(':id')
  async getRevenuById(@Param('id', ParseIntPipe) id: number) {
    return this.revenusService.getRevenuById(id);
  }

  @Post()
  async createRevenu(@Body() createRevenuDto: CreateRevenuDto) {
    await this.revenusService.createRevenus(createRevenuDto);
    return await this.getRevenus();
  }

  @Delete(':id')
  async deleteRevenuById(@Param('id', ParseIntPipe) id: number) {
    await this.revenusService.deleteRevenu(id);
  }

  @Put(':id')
  async updateRevenuById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createRevenuDto: CreateRevenuDto,
  ) {
    await this.revenusService.updateRevenu(id, createRevenuDto);
    return this.getRevenus();
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

}

