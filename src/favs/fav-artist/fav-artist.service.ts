import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FavArtistEntity } from './entities/fav-artist.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Injectable()
export class FavArtistService {
  constructor(
    @InjectRepository(FavArtistEntity)
    private favArtistRepo: Repository<FavArtistEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
  ) {}

  async addArtistToFav(id: string): Promise<string> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect artist ID', HttpStatus.BAD_REQUEST);
    }

    let artist: null | ArtistEntity = null;

    artist = await this.artistRepo.findOneBy({ id: id });

    if (artist) {
      let artistInFavs: Partial<ArtistEntity> | null = null;

      artistInFavs = await this.favArtistRepo.findOneBy({ id: id });

      if (artistInFavs) {
        throw new HttpException(
          'Artist with entered ID already exists in favorites list',
          HttpStatus.FORBIDDEN,
        );
      } else {
        const newId = {
          id: id,
        };

        await this.favArtistRepo.save(newId);

        return JSON.stringify({
          message: 'Success! Artist was added to favorites',
        });
      }
    } else {
      throw new HttpException(
        `Artist with entered ID doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeArtistFromFav(id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect artist ID', HttpStatus.BAD_REQUEST);
    }

    let artist: null | Partial<ArtistEntity> = null;

    artist = await this.favArtistRepo.findOneBy({ id: id });

    if (artist) {
      await this.favArtistRepo.delete(id);
    } else {
      throw new HttpException(
        `Artist with entered id doesn't exist in favorites list`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
