import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { database } from 'src/database';

@Injectable()
export class FavTrackService {
  addTrackToFav(id: string): string {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect track ID', HttpStatus.BAD_REQUEST);
    }

    database.favorites.tracks.forEach((trackId) => {
      if (trackId === id) {
        throw new HttpException(
          'Track with entered ID already exists in favorites list',
          HttpStatus.FORBIDDEN,
        );
      }
    });

    let found = false;

    database.trackDatabase.forEach((dbTrack) => {
      if (dbTrack.id === id) {
        found = true;

        database.favorites.tracks.push(id);
      }
    });

    if (found) {
      return JSON.stringify({
        message: 'Success! Track was added to favorites',
      });
    } else {
      throw new HttpException(
        `Track with entered ID doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeTrackFromFav(id: string): void {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect track ID', HttpStatus.BAD_REQUEST);
    }

    let deleted = false;

    database.favorites.tracks.forEach((trackId, index) => {
      if (trackId === id) {
        database.favorites.tracks.splice(index, 1);

        deleted = true;
      }
    });

    if (!deleted) {
      throw new HttpException(
        `Track with entered id doesn't exist in favorites list`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
