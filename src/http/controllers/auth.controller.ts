import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { Users } from '../../models/user.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: Users): Promise<Users> {
    return this.usersService.signup(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.usersService.login(req.user);
  }
}