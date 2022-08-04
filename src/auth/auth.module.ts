import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { AccessJWTStrategy } from './strategies/access.strategy';
import { RefreshJWTStrategy } from './strategies/refresh.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, AccessJWTStrategy, RefreshJWTStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
