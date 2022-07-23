import { Album, Artist, Track, User } from './interfaces';

class InMemoryDatabase {
  public userDatabase: User[];
  public trackDatabase: Track[];
  public artistDatabase: Artist[];
  public albumDatabase: Album[];
  public favorites: {
    artists: string[];
    albums: string[];
    tracks: string[];
  };

  constructor() {
    this.userDatabase = [];
    this.trackDatabase = [];
    this.artistDatabase = [];
    this.albumDatabase = [];

    this.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }
}

const database = new InMemoryDatabase();

export { database };
