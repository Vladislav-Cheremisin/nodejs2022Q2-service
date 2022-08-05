import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async signUser(userId: string, login: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login: login,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: 60 * 10,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login: login,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: 60 * 1,
        },
      ),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async saveRefreshTokenHash(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);

    await this.userRepo.update(userId, {
      refreshTokenHash: hash,
    });
  }

  async signUp(dto: SignUpDto): Promise<string> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepo.create({
      login: dto.login,
      password: hashedPassword,
    });

    await this.userRepo.save(newUser);

    const response = JSON.stringify({
      message: 'New user was created successfully',
    });

    return response;
  }

  async login(dto: SignUpDto): Promise<Tokens> {
    const user = await this.userRepo.findOneBy({ login: dto.login });

    if (user && (await bcrypt.compare(dto.password, user.password))) {
      const tokens = await this.signUser(user.id, user.login);

      await this.saveRefreshTokenHash(user.id, tokens.refreshToken);

      return tokens;
    } else {
      throw new HttpException(
        `Incorrect password, or user with entered login doesn't exist`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        `There are no refreshToken property in request body`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = await this.jwtService
      .verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      })
      .catch(() => {
        throw new HttpException(
          `Incorrect refreshToken property in request body`,
          HttpStatus.FORBIDDEN,
        );
      });

    if (payload) {
      const userId = payload.sub;
      const user = await this.userRepo.findOneBy({ id: userId });

      if (user && (await bcrypt.compare(refreshToken, user.refreshTokenHash))) {
        const tokens = await this.signUser(user.id, user.login);

        await this.saveRefreshTokenHash(user.id, tokens.refreshToken);

        return tokens;
      } else {
        throw new HttpException(`Access Denied!`, HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
