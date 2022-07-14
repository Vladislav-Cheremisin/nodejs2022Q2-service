import { User } from './interfaces';

class InMemoryDatabase {
  private userDatabase: User[];

  constructor() {
    this.userDatabase = [
      {
        id: '1',
        login: 'TestUser',
        password: '123e123ee',
        version: 2,
        createdAt: 123,
        updatedAt: 321,
      },
    ];
  }

  getUsers = (): string => JSON.stringify(this.userDatabase);
}

const database = new InMemoryDatabase();

export { database };
