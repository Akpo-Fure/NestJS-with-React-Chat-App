import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() dto: SignUpDTO) {
    return await this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() dto: SignInDTO) {
    return await this.authService.signIn(dto);
  }
}
