import { Track } from 'src/interfaces';
import { database } from 'src/database';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class TrackService {
  getTracks(): string {
    return JSON.stringify(database.trackDatabase);
  }

  getTrack(id: string): string {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect track ID', HttpStatus.BAD_REQUEST);
    }

    let result: null | Track = null;

    database.trackDatabase.forEach((track) => {
      if (track.id === id) {
        result = track;
      }
    });

    if (result === null) {
      throw new HttpException(
        'Track with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return JSON.stringify(result);
    }
  }

  createTrack(CreateTrackDto: CreateTrackDto): string {
    if (
      typeof CreateTrackDto.name === 'string' &&
      typeof CreateTrackDto.duration === 'number'
    ) {
      const result: Track = {
        id: uuid.v4(),
        name: CreateTrackDto.name,
        artistId: null,
        albumId: null,
        duration: CreateTrackDto.duration,
      };

      if (typeof CreateTrackDto.albumId === 'string') {
        result.albumId = CreateTrackDto.albumId;
      }

      if (typeof CreateTrackDto.artistId === 'string') {
        result.artistId = CreateTrackDto.artistId;
      }

      database.trackDatabase.push(result);
      return JSON.stringify(result);
    } else {
      throw new HttpException(
        'incorrect request body, fields name and duration are required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  updateTrack(updateTrackDto: UpdateTrackDto, id: string): string {
    const track = JSON.parse(this.getTrack(id));

    database.trackDatabase.forEach((dbTrack) => {
      if (dbTrack.id === id) {
        if (typeof updateTrackDto.name === 'string') {
          dbTrack.name = updateTrackDto.name;
          track.name = dbTrack.name;
        } else {
          throw new HttpException(
            'Incorrect name in request body',
            HttpStatus.BAD_REQUEST,
          );
        }

        if (typeof updateTrackDto.duration === 'number') {
          dbTrack.duration = updateTrackDto.duration;
          track.duration = dbTrack.duration;
        } else {
          throw new HttpException(
            'Incorrect duration in request body',
            HttpStatus.BAD_REQUEST,
          );
        }

        if (
          uuid.validate(updateTrackDto.albumId) ||
          updateTrackDto.albumId === null
        ) {
          dbTrack.albumId = updateTrackDto.albumId;
          track.albumId = dbTrack.albumId;
        } else {
          throw new HttpException(
            'Incorrect album ID in request body',
            HttpStatus.BAD_REQUEST,
          );
        }

        if (
          uuid.validate(updateTrackDto.artistId) ||
          updateTrackDto.artistId === null
        ) {
          dbTrack.artistId = updateTrackDto.artistId;
          track.artistId = dbTrack.artistId;
        } else {
          throw new HttpException(
            'Incorrect artist ID in request body',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    });

    return JSON.stringify(track);
  }

  deleteTrack(id: string): void {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect track ID', HttpStatus.BAD_REQUEST);
    }

    let trackExists = false;

    for (let i = 0; i < database.trackDatabase.length; i++) {
      if (database.trackDatabase[i].id === id) {
        database.trackDatabase.splice(i, 1);

        trackExists = true;

        database.favorites.tracks.forEach((trackId, index) => {
          if (trackId === id) {
            database.favorites.tracks.splice(index, 1);
          }
        });
      }
    }

    if (!trackExists) {
      throw new HttpException(
        'Track with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
