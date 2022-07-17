import { User } from './interfaces';
import * as uuid from 'uuid';

class InMemoryDatabase {
  public userDatabase: User[];

  constructor() {
    this.userDatabase = [
      {
        id: uuid.v4(),
        login: 'TestUser',
        password: 'qwerty',
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];
  }
}

const database = new InMemoryDatabase();

export { database };
