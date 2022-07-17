import { Track, User } from './interfaces';
import * as uuid from 'uuid';

class InMemoryDatabase {
  public userDatabase: User[];
  public trackDatabase: Track[];

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

    this.trackDatabase = [
      {
        id: uuid.v4(),
        name: 'Test Track',
        artistId: null,
        albumId: null,
        duration: 210,
      },
    ];
  }
}

const database = new InMemoryDatabase();

export { database };
