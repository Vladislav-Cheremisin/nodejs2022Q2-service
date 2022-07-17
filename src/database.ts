import { Artist, Track, User } from './interfaces';
import * as uuid from 'uuid';

class InMemoryDatabase {
  public userDatabase: User[];
  public trackDatabase: Track[];
  public artistDatabase: Artist[];

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

    this.artistDatabase = [
      {
        id: uuid.v4(),
        name: 'Test Artist',
        grammy: false,
      },
    ];
  }
}

const database = new InMemoryDatabase();

export { database };
