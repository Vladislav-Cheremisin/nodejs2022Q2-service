import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { database } from 'src/database';
import { Album } from 'src/interfaces';
import * as uuid from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  getAlbums(): string {
    return JSON.stringify(database.albumDatabase);
  }

  getAlbum(id: string): string {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect album ID', HttpStatus.BAD_REQUEST);
    }

    let result: null | Album = null;

    database.albumDatabase.forEach((album) => {
      if (album.id === id) {
        result = album;
      }
    });

    if (result === null) {
      throw new HttpException(
        'Album with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return JSON.stringify(result);
    }
  }

  createAlbum(createAlbumDto: CreateAlbumDto): string {
    if (
      typeof createAlbumDto.name === 'string' &&
      typeof createAlbumDto.year === 'number'
    ) {
      const album: Album = {
        id: uuid.v4(),
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: null,
      };

      if (typeof createAlbumDto.artistId === 'string') {
        album.artistId = createAlbumDto.artistId;
      }

      database.albumDatabase.push(album);
      return JSON.stringify(album);
    } else {
      throw new HttpException(
        'incorrect request body, fields name and duration are required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string): string {
    const album = JSON.parse(this.getAlbum(id));

    database.albumDatabase.forEach((dbAlbum) => {
      if (dbAlbum.id === id) {
        if (typeof updateAlbumDto.name === 'string') {
          dbAlbum.name = updateAlbumDto.name;
          album.name = dbAlbum.name;
        }

        if (typeof updateAlbumDto.year === 'number') {
          dbAlbum.year = updateAlbumDto.year;
          album.year = dbAlbum.year;
        }

        if (
          typeof updateAlbumDto.artistId === 'string' ||
          updateAlbumDto.artistId === null
        ) {
          dbAlbum.artistId = updateAlbumDto.artistId;
          album.artistId = dbAlbum.artistId;
        }
      }
    });

    return JSON.stringify(album);
  }

  deleteAlbum(id: string): void {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect album ID', HttpStatus.BAD_REQUEST);
    }

    let albumExists = false;

    for (let i = 0; i < database.albumDatabase.length; i++) {
      if (database.albumDatabase[i].id === id) {
        database.albumDatabase.splice(i, 1);

        albumExists = true;
      }
    }

    if (!albumExists) {
      throw new HttpException(
        'Album with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
