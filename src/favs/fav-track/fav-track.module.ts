import { Module } from '@nestjs/common';
import { FavTrackService } from './fav-track.service';
import { FavTrackController } from './fav-track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavTrackEntity } from './entities/fav-track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavTrackEntity])],
  providers: [FavTrackService],
  controllers: [FavTrackController],
})
export class FavTrackModule {}
