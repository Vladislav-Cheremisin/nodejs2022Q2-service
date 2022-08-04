import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Tokens } from './types/tokens.type';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshGuard } from 'src/common/guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  async signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return await this.authService.signUp(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Header('Content-type', 'application/json')
  async login(@Body() dto: SignUpDto): Promise<Tokens> {
    return await this.authService.login(dto);
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Header('Content-type', 'application/json')
  async refresh(@Req() req: Request) {
    const user = req.user;

    return await this.authService.refresh(user['sub'], user['refreshToken']);
  }
}
