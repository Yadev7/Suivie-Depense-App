import { HttpException, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/services/users/users.service";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private UserService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto:any) {
    const { email, password } = loginDto;
    const user = await this.UserService.findOne({ email: email });
    if (!user) throw new HttpException('NOT_FOUND', 404);

    const isPasswordValid = await compare(password, user.password);
  //console.log(isPasswordValid)
    if (!isPasswordValid) throw new HttpException('INVALID_PASSWORD', 403);
    const payload = { id: user.id, email: user.email };
    const secretKey = "your-secret-key"; // Replace with your actual secret key

    const token = await this.jwtService.signAsync(payload, { secret: secretKey });
    const userId = await (await this.UserService.getUserById(user.id)).id;

    return {
      access_token: token,
      userId: userId,
    };
  }

  


  // async hashPassword(password: string): Promise<string> {
  //   const saltRounds = 10; // Number of salt rounds
  //   const salt = await crypto.genSalt(saltRounds);
  //   const hash = await crypto.hash(password, salt);
  //   return hash;
  // }
}