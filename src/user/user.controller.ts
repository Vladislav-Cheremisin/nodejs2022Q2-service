import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Header('Content-type', 'application/json')
  getUsers(): string {
    return this.userService.getUsers();
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  getUser(@Param('id') id: string): string {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createUser(@Body() createUserDto: CreateUserDto): string {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @Header('Content-type', 'application/json')
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ): string {
    return this.userService.updatePassword(updatePasswordDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
