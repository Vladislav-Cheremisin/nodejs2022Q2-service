import { User, UserResponse } from 'src/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  async getUser(id: string): Promise<Partial<UserEntity>> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect user ID', HttpStatus.BAD_REQUEST);
    }

    let result: null | UserResponse = null;

    result = await this.userRepo.findOneBy({ id: id });

    if (result === null) {
      throw new HttpException(
        'User with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return result;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    if (
      typeof createUserDto.login === 'string' &&
      typeof createUserDto.password === 'string'
    ) {
      const user = new UserEntity();

      user.login = createUserDto.login;
      user.password = createUserDto.password;

      return this.userRepo.save(user);
    } else {
      throw new HttpException('incorrect request body', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(
    updatePasswordDto: UpdatePasswordDto,
    id: string,
  ): Promise<Partial<UserEntity>> {
    if (
      !updatePasswordDto ||
      !updatePasswordDto.oldPassword ||
      !updatePasswordDto.newPassword
    ) {
      throw new HttpException('Incorrect request body', HttpStatus.BAD_REQUEST);
    }

    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect user ID', HttpStatus.BAD_REQUEST);
    }

    let foundedUser: User | null = null;

    foundedUser = await this.userRepo.findOneBy({ id: id });

    if (foundedUser) {
      if (
        typeof updatePasswordDto.oldPassword === 'string' &&
        typeof updatePasswordDto.newPassword === 'string' &&
        updatePasswordDto.oldPassword === foundedUser.password
      ) {
        const updatedData: Partial<UserEntity> = {
          password: updatePasswordDto.newPassword,
        };

        await this.userRepo.update(id, updatedData);

        return await this.userRepo.findOneBy({ id: id });
      } else {
        throw new HttpException(
          `Wrong old password or incorrect body data`,
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new HttpException(
        `User with entered id doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect user ID', HttpStatus.BAD_REQUEST);
    }

    let user = null;

    user = await this.userRepo.findOneBy({ id: id });

    if (user !== null) {
      this.userRepo.delete(id);
    } else {
      throw new HttpException(
        'User with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
