import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('boxed-signin')
  async login(@Body() loginDto) {
    //  console.log(loginDto);
     const logger = await this.authService.login(loginDto);
     const token = logger.access_token;
     const id = logger.userId;
    return {token , id};
  }

  // @UseGuards(JWTAuthGuard)
  // @Get('user-info')
  // getUserInfo(@Request() req) {
  //   return {
  //     user_info: req?.user,
  //   };
  // }
}
