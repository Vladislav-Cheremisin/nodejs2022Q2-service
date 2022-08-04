import { User, UserResponse } from 'src/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';

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
      let userLoginCheck: null | UserEntity = null;

      userLoginCheck = await this.userRepo.findOneBy({
        login: createUserDto.login,
      });

      if (userLoginCheck) {
        throw new HttpException(
          'User with entered login already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = new UserEntity();
      const userPassword = await bcrypt.hash(createUserDto.password, 10);

      user.login = createUserDto.login;
      user.password = userPassword;

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
        (await bcrypt.compare(
          updatePasswordDto.oldPassword,
          foundedUser.password,
        ))
      ) {
        const hashedNewPassword = await bcrypt.hash(
          updatePasswordDto.newPassword,
          10,
        );

        const updatedData: Partial<UserEntity> = {
          password: hashedNewPassword,
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
