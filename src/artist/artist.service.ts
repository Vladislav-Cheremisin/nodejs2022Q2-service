import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { database } from 'src/database';
import { Artist } from 'src/interfaces';
import * as uuid from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  getArtists(): string {
    return JSON.stringify(database.artistDatabase);
  }

  getArtist(id: string): string {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect artist ID', HttpStatus.BAD_REQUEST);
    }

    let result: null | Artist = null;

    database.artistDatabase.forEach((artist) => {
      if (artist.id === id) {
        result = artist;
      }
    });

    if (result === null) {
      throw new HttpException(
        'Artist with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return JSON.stringify(result);
    }
  }

  createArtist(createArtistDto: CreateArtistDto): string {
    if (
      typeof createArtistDto.name === 'string' &&
      typeof createArtistDto.grammy === 'boolean'
    ) {
      const artist: Artist = {
        id: uuid.v4(),
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      };

      database.artistDatabase.push(artist);
      return JSON.stringify(artist);
    } else {
      throw new HttpException(
        'incorrect request body, fields name and duration are required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  updateArtist(updateArtistDto: UpdateArtistDto, id: string): string {
    const artist = JSON.parse(this.getArtist(id));

    database.artistDatabase.forEach((dbArtist) => {
      if (dbArtist.id === id) {
        if (typeof updateArtistDto.name === 'string') {
          dbArtist.name = updateArtistDto.name;
          artist.name = dbArtist.name;
        }

        if (typeof updateArtistDto.grammy === 'boolean') {
          dbArtist.grammy = updateArtistDto.grammy;
          artist.grammy = dbArtist.grammy;
        }
      }
    });

    return JSON.stringify(artist);
  }

  deleteArtist(id: string): void {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect artist ID', HttpStatus.BAD_REQUEST);
    }

    let artistExists = false;

    for (let i = 0; i < database.artistDatabase.length; i++) {
      if (database.artistDatabase[i].id === id) {
        database.artistDatabase.splice(i, 1);

        artistExists = true;
      }
    }

    if (!artistExists) {
      throw new HttpException(
        'Artist with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
