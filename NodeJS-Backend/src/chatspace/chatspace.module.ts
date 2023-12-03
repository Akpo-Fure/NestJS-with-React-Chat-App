import { Module } from '@nestjs/common';
import { ChatspaceController } from './chatspace.controller';
import { ChatspaceService } from './chatspace.service';

@Module({
  controllers: [ChatspaceController],
  providers: [ChatspaceService],
})
export class ChatspaceModule {}
