import { Injectable } from '@nestjs/common';
import { database } from 'src/database';

@Injectable()
export class UserService {
  getAllUsers = (): string => {
    return database.getUsers();
  };
}
