import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserParams } from 'src/utils/types';

@Controller('users')
export class UsersController {
    [x: string]: any;
     constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers() {
        return this.usersService.fetchUsers()
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id:number) {
        return this.usersService.getUserById(id)
    }


    @Post('add')
    async addUser(@Body() userDto: CreateUserDto) {
      return await this.usersService.createUser(userDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id:number) {
        return await this.usersService.deleteUser(id)
    }

    // @Put(':id')
    // async updateUser(@Param('id', ParseIntPipe) id:number, @Body() userDto: CreateUserDto) {
    //     return await this.usersService.updateUser(id, userDto)
    // }
    
}
