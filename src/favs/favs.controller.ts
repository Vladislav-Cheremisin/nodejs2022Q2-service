import { Controller, Get, Header } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @Header('Content-type', 'application/json')
  async getFavs(): Promise<string> {
    return await this.favsService.getFavs();
  }
}
