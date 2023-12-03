import { Injectable, NotFoundException } from '@nestjs/common';
import { SendRequestDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class InviteService {
  constructor(private prisma: PrismaService) {}
  async sendFriendRequest(senderId: string, dto: SendRequestDTO) {
    const receiver = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!receiver) throw new NotFoundException('User not found');
    const invite = await this.prisma.chatSpaceInvite.create({
      data: {
        senderId,
        receiverId: receiver.id,
        email: dto.email,
      },
    });
    return invite;
  }

  async acceptFriendRequest(user: User, inviteId: string) {
    const invite = await this.prisma.chatSpaceInvite.findFirst({
      where: {
        id: inviteId,
        email: user.email,
      },
    });
    if (!invite) throw new NotFoundException('invalid invite');
    const chatspace = await this.prisma.chatSpace.create({
      data: {
        users: {
          create: [{ userId: invite.senderId }, { userId: invite.receiverId }],
        },
      },
      include: {
        users: true,
      },
    });

    return chatspace;
  }
}
