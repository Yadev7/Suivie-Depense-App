import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import  { hash } from 'bcrypt'
import { CreateUserParams } from 'src/utils/types'
// export type User = any;
@Injectable()
export class UsersService {
  users: any[];
    constructor(@InjectRepository(User) private  userRepository: Repository<User>,

    ) {}


    async findOne(query: any) {
        const user = await this.userRepository.findOne({
          where: query,
        });
        return user;
      }
      async createUser(registerDto) {
        const { password } = registerDto;
        const hashedPassword = await hash(password, 10);
        const payload = {
          ...registerDto,
          password: hashedPassword,
          created_at: new Date(),
        };
        await this.userRepository.save(payload);
        return this.fetchUsers();
      }

    fetchUsers(){
        return this.userRepository.find();
    }

    getUserById(id:number){
      return this.userRepository.findOneBy({ id });
  }

    async deleteUser(id:number){
        return await this.userRepository.delete(id)
    }


    
}
