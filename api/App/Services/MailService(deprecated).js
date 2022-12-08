import nodemailer from 'nodemailer';
import mailConfig from '#config/mail';
import Env from '#config/Env';
import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/**
 * @deprecated see MailService.js
 */
export default class Mail {
   static transporter = nodemailer.createTransport(mailConfig);

   static name = 'Do Not Reply';

   static async sendHtml(subject, html, ...recievers) {
      await this.transporter.sendMail({
         from: `${this.name} 🦍 <${mailConfig.auth.user}>`,
         to: `${recievers.join(', ')}`,
         subject,
         html,
      });
   }

   static async sendText(subject, text, ...recievers) {
      await this.transporter.sendMail({
         from: `${this.name} 🦍 <${mailConfig.auth.user}>`,
         to: `${recievers.join(', ')}`,
         subject,
         text,
      });
   }

   static async verificationMail(user, code) {
      const source = (
         await fs.readFile(
            path.join(
               __dirname,
               '..',
               '..',
               'resources',
               'mails',
               'verify.html'
            )
         )
      ).toString();
      const template = Handlebars.compile(source);
      const replacements = { name: user.first_name, code };
      const html = template(replacements);
      await this.sendHtml('Verify your account', html, [user.email]);
   }
}
