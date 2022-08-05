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
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  async signUp(@Body() dto: SignUpDto): Promise<string> {
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
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Header('Content-type', 'application/json')
  async refresh(@Body() body) {
    return await this.authService.refresh(body.refreshToken);
  }
}
