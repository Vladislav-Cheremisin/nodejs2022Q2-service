import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavoritesResponse } from 'src/interfaces';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { FavAlbumEntity } from './fav-album/entities/fav-album.entity';
import { FavArtistEntity } from './fav-artist/entities/fav-artist.entity';
import { FavTrackEntity } from './fav-track/entities/fav-track.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavArtistEntity)
    private favArtistRepo: Repository<FavArtistEntity>,
    @InjectRepository(FavAlbumEntity)
    private favAlbumRepo: Repository<FavAlbumEntity>,
    @InjectRepository(FavTrackEntity)
    private favTrackRepo: Repository<FavTrackEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepo: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private TrackRepo: Repository<TrackEntity>,
  ) {}

  async getFavs(): Promise<string> {
    const response: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    const artists = await this.favArtistRepo.find();
    const albums = await this.favAlbumRepo.find();
    const tracks = await this.favTrackRepo.find();

    for (let i = 0; i < artists.length; i++) {
      const fullItem = await this.artistRepo.findOneBy({ id: artists[i].id });

      response.artists.push(fullItem);
    }

    for (let i = 0; i < albums.length; i++) {
      const fullItem = await this.albumRepo.findOneBy({ id: albums[i].id });

      response.albums.push(fullItem);
    }

    for (let i = 0; i < tracks.length; i++) {
      const fullItem = await this.TrackRepo.findOneBy({ id: tracks[i].id });

      response.tracks.push(fullItem);
    }

    return JSON.stringify(response);
  }
}
