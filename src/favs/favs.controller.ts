import { Controller, Get, Header } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @Header('Content-type', 'application/json')
  getFavs(): string {
    return this.favsService.getFavs();
  }
}
