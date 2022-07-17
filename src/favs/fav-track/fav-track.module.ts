import { Module } from '@nestjs/common';
import { FavTrackService } from './fav-track.service';
import { FavTrackController } from './fav-track.controller';

@Module({
  providers: [FavTrackService],
  controllers: [FavTrackController]
})
export class FavTrackModule {}
