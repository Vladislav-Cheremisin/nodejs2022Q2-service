import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Tokens } from './types/tokens.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  async signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return await this.authService.signUp(dto);
  }

  @Post('/login')
  @Header('Content-type', 'application/json')
  async login() {
    return await this.authService.login();
  }

  @Post('/refresh')
  @Header('Content-type', 'application/json')
  async refresh() {
    return await this.authService.refresh();
  }
}
