import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { database } from 'src/database';

@Injectable()
export class FavArtistService {
  addArtistToFav(id: string): string {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect artist ID', HttpStatus.BAD_REQUEST);
    }

    database.favorites.artists.forEach((artistId) => {
      if (artistId === id) {
        throw new HttpException(
          'Artist with entered ID already exists in favorites list',
          HttpStatus.FORBIDDEN,
        );
      }
    });

    let found = false;

    database.artistDatabase.forEach((dbArtist) => {
      if (dbArtist.id === id) {
        found = true;

        database.favorites.artists.push(id);
      }
    });

    if (found) {
      return JSON.stringify({
        message: 'Success! Artist was added to favorites',
      });
    } else {
      throw new HttpException(
        `Artist with entered ID doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeArtistFromFav(id: string): void {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect artist ID', HttpStatus.BAD_REQUEST);
    }

    let deleted = false;

    database.favorites.artists.forEach((artistId, index) => {
      if (artistId === id) {
        database.favorites.artists.splice(index, 1);

        deleted = true;
      }
    });

    if (!deleted) {
      throw new HttpException(
        `Artist with entered id doesn't exist in favorites list`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
