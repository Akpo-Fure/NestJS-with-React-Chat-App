import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() dto: SignUpDTO) {
    return await this.authService.signUp(dto);
  }
}
