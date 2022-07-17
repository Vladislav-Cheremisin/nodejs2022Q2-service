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

  createTrack(createUserDto: CreateTrackDto): string {
    if (
      typeof createUserDto.name === 'string' &&
      typeof createUserDto.duration === 'number'
    ) {
      const result: Track = {
        id: uuid.v4(),
        name: createUserDto.name,
        artistId: null,
        albumId: null,
        duration: createUserDto.duration,
      };

      if (typeof createUserDto.albumId === 'string') {
        result.albumId = createUserDto.albumId;
      }

      if (typeof createUserDto.artistId === 'string') {
        result.artistId = createUserDto.artistId;
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
          track.name = updateTrackDto.name;
        }

        if (typeof updateTrackDto.duration === 'number') {
          dbTrack.duration = updateTrackDto.duration;
          track.duration = dbTrack.duration;
        }

        if (
          typeof updateTrackDto.albumId === 'string' ||
          updateTrackDto.albumId === null
        ) {
          dbTrack.albumId = updateTrackDto.albumId;
          track.albumId = dbTrack.albumId;
        }

        if (
          typeof updateTrackDto.artistId === 'string' ||
          updateTrackDto.artistId === null
        ) {
          dbTrack.artistId = updateTrackDto.artistId;
          track.artistId = dbTrack.artistId;
        }
      }
    });

    return JSON.stringify(track);
  }

  deleteTrack(id: string): void {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect user ID', HttpStatus.BAD_REQUEST);
    }

    let trackExists = false;

    for (let i = 0; i < database.trackDatabase.length; i++) {
      if (database.trackDatabase[i].id === id) {
        database.trackDatabase.splice(i, 1);

        trackExists = true;
      }
    }

    if (!trackExists) {
      throw new HttpException(
        'User with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
