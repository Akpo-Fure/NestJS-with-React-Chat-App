import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailerService {
  async sendEmail(
    options: nodemailer.SendMailOptions,
    templateFilePath: string | undefined,
    data: any | undefined,
  ) {
    const transorter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    try {
      await transorter.verify();
    } catch (error) {
      throw new NotAcceptableException(error);
    }

    const templateContent = fs.readFileSync(
      path.resolve(templateFilePath),
      'utf-8',
    );

    const compiledTemplate = handlebars.compile(templateContent);

    const htmlContent = compiledTemplate(data);

    try {
      const mailOptions: nodemailer.SendMailOptions = {
        ...options,
        from: 'chatapp@gmail.com',
        subject: 'Test Email with HTML',
        html: htmlContent,
      };

      transorter.sendMail(mailOptions);
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }
}
