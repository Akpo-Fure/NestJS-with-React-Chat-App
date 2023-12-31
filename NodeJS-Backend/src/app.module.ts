import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { UserModule } from './user/user.module';
import { ChatspaceModule } from './chatspace/chatspace.module';
import { InviteModule } from './invite/invite.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    MailerModule,
    UserModule,
    ChatspaceModule,
    InviteModule,
    MessageModule,
  ],
})
export class AppModule {}
