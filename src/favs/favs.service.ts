import { Injectable } from '@nestjs/common';
import { database } from 'src/database';
import { FavoritesResponse } from 'src/interfaces';

@Injectable()
export class FavsService {
  getFavs(): string {
    const response: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    database.favorites.artists.forEach((artistId) => {
      database.artistDatabase.forEach((artist) => {
        if (artist.id === artistId) {
          response.artists.push(artist);
        }
      });
    });

    database.favorites.albums.forEach((albumId) => {
      database.albumDatabase.forEach((album) => {
        if (album.id === albumId) {
          response.albums.push(album);
        }
      });
    });

    database.favorites.tracks.forEach((trackId) => {
      database.trackDatabase.forEach((track) => {
        if (track.id === trackId) {
          response.tracks.push(track);
        }
      });
    });

    return JSON.stringify(response);
  }
}
