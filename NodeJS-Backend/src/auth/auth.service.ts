import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDTO } from './dto';

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

    user = await this.prisma.user.create({
      data: {
        ...dto,
      },
    });

    return user;
  }
}
