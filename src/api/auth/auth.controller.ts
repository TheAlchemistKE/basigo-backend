import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAdmin } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() admin: IAdmin) {
    return await this.authService.create(admin);
  }

  @Post('login')
  public async login(@Body() admin: IAdmin) {
    return await this.authService.login(admin);
  }
}
