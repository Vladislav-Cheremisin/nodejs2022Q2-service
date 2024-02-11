import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FavAlbumEntity } from './entities/fav-album.entity';
import { Repository } from 'typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Injectable()
export class FavAlbumService {
  constructor(
    @InjectRepository(FavAlbumEntity)
    private favAlbumRepo: Repository<FavAlbumEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepo: Repository<AlbumEntity>,
  ) {}

  async addAlbumToFav(id: string): Promise<string> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect album ID', HttpStatus.BAD_REQUEST);
    }

    let album: null | AlbumEntity = null;

    album = await this.albumRepo.findOneBy({ id: id });

    if (album) {
      let albumInFavs: Partial<AlbumEntity> | null = null;

      albumInFavs = await this.favAlbumRepo.findOneBy({ id: id });

      if (albumInFavs) {
        throw new HttpException(
          'Album with entered ID already exists in favorites list',
          HttpStatus.FORBIDDEN,
        );
      } else {
        const newId = {
          id: id,
        };

        await this.favAlbumRepo.save(newId);

        return JSON.stringify({
          message: 'Success! Album was added to favorites',
        });
      }
    } else {
      throw new HttpException(
        `Album with entered ID doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeAlbumFromFav(id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect album ID', HttpStatus.BAD_REQUEST);
    }

    let album: null | Partial<AlbumEntity> = null;

    album = await this.favAlbumRepo.findOneBy({ id: id });

    if (album) {
      let albumInFavs: null | Partial<AlbumEntity> = null;

      albumInFavs = await this.favAlbumRepo.findOneBy({ id: id });

      if (albumInFavs) {
        await this.favAlbumRepo.delete(id);
      }
    } else {
      throw new HttpException(
        `Album with entered id doesn't exist in favorites list`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
