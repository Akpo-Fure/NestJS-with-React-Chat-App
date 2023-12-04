import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}
  async sendMessage(userId: string, dto: SendMessageDto, chatSpaceId: string) {
    // implement sending email notification
    const message = await this.prisma.message.create({
      data: {
        content: dto.message,
        senderId: userId,
        chatSpaceId,
      },
    });
    return message;
  }

  async receiveMessages(chatSpaceId: string) {
    const messages = await this.prisma.message.findMany({
      where: {
        chatSpaceId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return messages;
  }
}
