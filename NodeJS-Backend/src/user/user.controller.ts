import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('')
  async GetUser(@GetUser() user: User) {
    return user;
  }
}
