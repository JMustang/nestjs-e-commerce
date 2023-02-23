import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { Users } from '../../models/user.model';
import { ApiTags } from '@nestjs/swagger';
import { UserRequest } from '../request/user.request';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly usersService: AuthService) {}

  @Post('signup')
  async signup(@Body() userRequest: UserRequest): Promise<Users> {
    return this.usersService.signup(userRequest);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.usersService.login(req.user);
  }
}
