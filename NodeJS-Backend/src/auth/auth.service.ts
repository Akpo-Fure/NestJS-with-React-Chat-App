import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDTO, SignUpDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: SignUpDTO) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) throw new NotAcceptableException('User already exists');
    dto.password = await argon.hash(dto.password);
    user = await this.prisma.user.create({
      data: {
        ...dto,
      },
    });
    return user;
  }

  async signIn(dto: SignInDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const access = await argon.verify(user.password, dto.password);
    if (!access) throw new UnauthorizedException('Invalid credentials');
    return access;
  }
}
