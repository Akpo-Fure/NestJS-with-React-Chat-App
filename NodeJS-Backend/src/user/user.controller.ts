import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtGuard from '../auth/guards/jwt.guard';
import { GetUser } from 'src/auth/decorators';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('')
  async GetUser(@GetUser() user: User) {
    return user;
  }
}
