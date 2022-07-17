import { User, UserResponse } from 'src/interfaces';
import { database } from 'src/database';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  getUsers(): string {
    const parsedUsers: UserResponse[] = [];

    database.userDatabase.forEach((user: User) => {
      const parsedUser: UserResponse = {
        id: user.id,
        login: user.login,
        version: user.version,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      };

      parsedUsers.push(parsedUser);
    });

    return JSON.stringify(parsedUsers);
  }

  getUser(id: string): string {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect user ID', HttpStatus.BAD_REQUEST);
    }

    let result: null | UserResponse = null;

    database.userDatabase.forEach((user) => {
      if (user.id === id) {
        result = {
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      }
    });

    if (result === null) {
      throw new HttpException(
        'User with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return JSON.stringify(result);
    }
  }

  createUser(createUserDto: CreateUserDto): string {
    if (
      typeof createUserDto.login === 'string' &&
      typeof createUserDto.password === 'string'
    ) {
      const timeStamp: number = Date.now();
      const user: User = {
        id: uuid.v4(),
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: timeStamp,
        updatedAt: timeStamp,
      };

      const userResponse: UserResponse = {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      database.userDatabase.push(user);
      return JSON.stringify(userResponse);
    } else {
      throw new HttpException('incorrect request body', HttpStatus.BAD_REQUEST);
    }
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto, id: string): string {
    const user = JSON.parse(this.getUser(id));

    database.userDatabase.forEach((dbUser) => {
      if (dbUser.id === user.id) {
        user.password = dbUser.password;
      }
    });

    if (
      typeof updatePasswordDto.oldPassword === 'string' &&
      typeof updatePasswordDto.newPassword === 'string' &&
      updatePasswordDto.oldPassword === user.password
    ) {
      database.userDatabase.forEach((dbUser) => {
        if (user.id === dbUser.id) {
          const timeStamp = Date.now();

          user.password = updatePasswordDto.newPassword;
          user.updatedAt = timeStamp;
          user.version += 1;

          dbUser.password = user.password;
          dbUser.updatedAt = user.updatedAt;
          dbUser.version = user.version;
        }
      });

      const userResponse: UserResponse = {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return JSON.stringify(userResponse);
    } else {
      throw new HttpException(
        'Wrong old password or incorrect request body',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  deleteUser(id: string): void {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect user ID', HttpStatus.BAD_REQUEST);
    }

    let userExists = false;

    for (let i = 0; i < database.userDatabase.length; i++) {
      if (database.userDatabase[i].id === id) {
        database.userDatabase.splice(i, 1);

        userExists = true;
      }
    }

    if (!userExists) {
      throw new HttpException(
        'User with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
