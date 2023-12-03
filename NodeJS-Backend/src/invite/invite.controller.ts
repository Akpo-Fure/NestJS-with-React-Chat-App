import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import JwtGuard from '../auth/guards/jwt.guard';
import { GetUser } from 'src/auth/decorators';
import { InviteService } from './invite.service';
import { SendRequestDTO } from './dto';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user/invite')
export class InviteController {
  constructor(private invite: InviteService) {}
  @Post('')
  async sendFriendRequest(
    @GetUser('id') senderId: string,
    dto: SendRequestDTO,
  ) {
    return await this.invite.sendFriendRequest(senderId, dto);
  }

  @Post('accept/:inviteId')
  async acceptFriendRequest(
    @GetUser() user: User,
    @Param('inviteId') inviteId: string,
  ) {
    return await this.invite.acceptFriendRequest(user, inviteId);
  }
}
