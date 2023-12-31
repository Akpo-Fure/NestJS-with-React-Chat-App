import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard, ChatSpaceGuard } from '../auth/guards';
import { SendMessageDto } from './dto';
import { MessageService } from './message.service';
import { GetUser } from 'src/auth/decorators';

@UseGuards(JwtGuard, ChatSpaceGuard)
@Controller('user/message')
export class MessageController {
  constructor(private message: MessageService) {}
  @Post(':chatspaceId')
  async sendMessage(
    @GetUser('id') userId: string,
    @Body() dto: SendMessageDto,
    @Param('chatspaceId') chatspaceId: string,
  ) {
    return await this.message.sendMessage(userId, dto, chatspaceId);
  }

  @Get(':chatspaceId')
  async receiveMessages(@Param('chatspaceId') chatspaceId: string) {
    return await this.message.receiveMessages(chatspaceId);
  }
}
