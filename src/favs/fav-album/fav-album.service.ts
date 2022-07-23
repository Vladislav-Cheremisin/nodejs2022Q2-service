import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { database } from 'src/database';

@Injectable()
export class FavAlbumService {
  addAlbumToFav(id: string): string {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect album ID', HttpStatus.BAD_REQUEST);
    }

    database.favorites.albums.forEach((albumId) => {
      if (albumId === id) {
        throw new HttpException(
          'Album with entered ID already exists in favorites list',
          HttpStatus.FORBIDDEN,
        );
      }
    });

    let found = false;

    database.albumDatabase.forEach((dbAlbum) => {
      if (dbAlbum.id === id) {
        found = true;

        database.favorites.albums.push(id);
      }
    });

    if (found) {
      return JSON.stringify({
        message: 'Success! Album was added to favorites',
      });
    } else {
      throw new HttpException(
        `Album with entered ID doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeAlbumFromFav(id: string): void {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect album ID', HttpStatus.BAD_REQUEST);
    }

    let deleted = false;

    database.favorites.albums.forEach((albumId, index) => {
      if (albumId === id) {
        database.favorites.albums.splice(index, 1);

        deleted = true;
      }
    });

    if (!deleted) {
      throw new HttpException(
        `Album with entered id doesn't exist in favorites list`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
