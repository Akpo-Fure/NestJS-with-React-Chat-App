import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInDTO,
  SignUpDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from './dto';

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

  @Post('verifyemail/:token')
  async verifyEmail(@Param('token') verifyToken: string) {
    return await this.authService.verifyEmail(verifyToken);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgotpassword')
  async forgotPassword(@Body() dto: ForgotPasswordDTO) {
    return await this.authService.forgotPassword(dto);
  }

  @Patch('resetpassword/:token')
  async resetPassword(
    @Body() dto: ResetPasswordDTO,
    @Param('token') resetToken: string,
  ) {
    return await this.authService.resetPassword(dto, resetToken);
  }
}
