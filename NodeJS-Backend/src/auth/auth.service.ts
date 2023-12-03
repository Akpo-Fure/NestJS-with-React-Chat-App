import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import {
  SignInDTO,
  SignUpDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from './dto';
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
    // await this.mailer.sendEmail({ to: user.email }, null, null);
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

  async forgotPassword(dto: ForgotPasswordDTO) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new NotFoundException("A user with this email doesn't exist");

    const verifyToken = crypto.randomBytes(32).toString('hex');

    const userToken = crypto
      .createHash('sha256')
      .update(verifyToken)
      .digest('hex');

    const userTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    user = await this.prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        verifyEmailToken: userToken,
        verifyEmailExpires: userTokenExpires,
      },
    });
    delete user.password;

    // await this.mailer.sendEmail({ to: user.email }, null, null);
    const response = { token: verifyToken, user };
    return response;
  }

  async resetPassword(dto: ResetPasswordDTO, resetToken: string) {
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    let user = await this.prisma.user.findFirst({
      where: {
        verifyEmailToken: hashedToken,
        verifyEmailExpires: {
          gt: new Date(),
        },
      },
    });
    if (!user) throw new NotFoundException('Token is invalid or has expired');
    const password = await argon.hash(dto.password);
    user = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password,
        verifyEmailToken: null,
        verifyEmailExpires: null,
      },
    });
    delete user.password;
    return user;
  }
}
