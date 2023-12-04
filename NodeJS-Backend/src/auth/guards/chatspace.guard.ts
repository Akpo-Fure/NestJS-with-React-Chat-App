import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatSpaceUser } from '@prisma/client';

@Injectable()
export class ChatSpaceGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const chatSpaceId = request.params?.id || request.params?.chatSpaceId;
    if (!chatSpaceId)
      throw new UnauthorizedException('Workspace Id not provided');

    const chatSpaceUser = user.chatSpaces?.find(
      (chatSpace: ChatSpaceUser) => chatSpace.chatSpaceId === chatSpaceId,
    );

    if (!chatSpaceUser)
      throw new UnauthorizedException('Unauthorized access to this workspace');

    request.workspaceUser = chatSpaceUser;

    return true;
  }
}
