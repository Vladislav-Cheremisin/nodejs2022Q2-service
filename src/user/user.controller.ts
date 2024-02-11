import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @Header('Content-type', 'application/json')
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @Header('Content-type', 'application/json')
  async getUser(@Param('id') id: string): Promise<Partial<UserEntity>> {
    return await this.userService.getUser(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @Header('Content-type', 'application/json')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ): Promise<Partial<UserEntity>> {
    return await this.userService.updatePassword(updatePasswordDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
