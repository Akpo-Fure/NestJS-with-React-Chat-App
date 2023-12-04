import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorators';
import { InviteService } from './invite.service';
import { SendRequestDTO } from './dto';
import { JwtGuard } from '../auth/guards';

@UseGuards(JwtGuard)
@Controller('user/invite')
export class InviteController {
  constructor(private invite: InviteService) {}
  @Post('')
  async sendFriendRequest(
    @GetUser('id') senderId: string,
    @Body() dto: SendRequestDTO,
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
