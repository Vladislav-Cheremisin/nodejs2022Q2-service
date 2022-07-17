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
    this.userDatabase = [
      {
        id: 'b0ef0c98-6fca-4710-99cb-66bdf2a7c871',
        login: 'TestUser',
        password: 'qwerty',
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    this.trackDatabase = [
      {
        id: '96740c24-28b2-48c3-ac3c-29fea3c990f3',
        name: 'Test Track',
        artistId: '3bec83c9-7703-49fa-b1ca-ad5f0232faae',
        albumId: '709c0829-58a6-466b-9634-e96e9d3ba929',
        duration: 210,
      },
    ];

    this.artistDatabase = [
      {
        id: '3bec83c9-7703-49fa-b1ca-ad5f0232faae',
        name: 'Test Artist',
        grammy: false,
      },
    ];

    this.albumDatabase = [
      {
        id: '709c0829-58a6-466b-9634-e96e9d3ba929',
        name: 'TestAlbum',
        year: 2022,
        artistId: '3bec83c9-7703-49fa-b1ca-ad5f0232faae',
      },
    ];

    this.favorites = {
      artists: ['3bec83c9-7703-49fa-b1ca-ad5f0232faae'],
      albums: ['709c0829-58a6-466b-9634-e96e9d3ba929'],
      tracks: ['96740c24-28b2-48c3-ac3c-29fea3c990f3'],
    };
  }
}

const database = new InMemoryDatabase();

export { database };
