import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signUser(userId: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: 'ChangeIt',
          expiresIn: 60 * 10,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: 'ChangeItRt',
          expiresIn: 60 * 30,
        },
      ),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async signUp(dto: SignUpDto): Promise<Tokens> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepo.create({
      login: dto.login,
      password: hashedPassword,
    });

    await this.userRepo.save(newUser);

    const tokens = await this.signUser(newUser.id);

    return tokens;
  }

  async login() {
    return 'nothing';
  }

  async refresh() {
    return 'nothing';
  }
}
