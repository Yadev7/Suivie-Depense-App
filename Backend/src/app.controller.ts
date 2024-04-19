import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!'; // Replace this with your desired response
  }

  // @Post('register')
  // async register(
  //   @Body('name') name: string,
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  // ) {
  //   const hashedPassword = await bcrypt.hash(password, 12);

  //   return this.appService.create({
  //     name,
  //     email,
  //     password: hashedPassword,
  //   });
  // }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.appService.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid credentials user');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials password');
    }

    return user;
  }


}
