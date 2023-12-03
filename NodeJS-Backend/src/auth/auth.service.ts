import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDTO, SignUpDTO } from './dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailer: MailerService,
  ) {}
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
    delete user.password;
    await this.mailer.sendEmail({ to: user.email }, null, null);
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
    const token = await this.jwt.signAsync({ sub: user.id });
    const response = { token };
    return response;
  }
}
