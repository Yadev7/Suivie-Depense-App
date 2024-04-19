import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './typeorm/entities/User';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

   [x: string]: any;
  getHello(): string {
    return 'Backend is working!';
  }

  async fetchUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data:any): Promise<User> {
    return this.userRepository.save(data);
  }

async findOne(id:any): Promise<User> {
  return this.userRepository.findOne(id);
}

}
