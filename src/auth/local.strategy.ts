import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const foundUser = await this.authService.validateUser(username, password);
    if (!foundUser) {
      throw new UnauthorizedException({
        message: 'Username or password is incorrect.',
      });
    }
    return foundUser;
  }
}
