import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { JwtStrategy } from '../strategies/jwt-stategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../models/user.model';
import { AuthController } from '../http/controllers/auth.controller';
import { Role } from '../models/role.model';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Users, Role]),
  ],
  providers: [AuthService, JwtService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
