import mailgun from 'mailgun-js';
import mailConfig from '#config/mail';
import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const mg = mailgun(mailConfig);

export default class Mail {
   static name = 'DIS-TODO noreply';
   static email = 'postmaster@isimisi.live';

   static async sendHtml(subject, html, ...recievers) {
      const data = {
         from: `${this.name} <${this.email}>`,
         to: `${recievers.join(', ')}`,
         subject,
         html,
      };

      return new Promise((resolve, reject) => {
         mg.messages().send(data, function (error, body) {
            if (error) return reject(error);
            resolve(body);
         });
      });
   }

   static async sendText(subject, text, ...recievers) {
      const data = {
         from: `${this.name} 🦍 <${this.email}>`,
         to: `${recievers.join(', ')}`,
         subject,
         text,
      };

      return new Promise((resolve, reject) => {
         mg.messages().send(data, function (error, body) {
            if (error) return reject(error);
            resolve(body);
         });
      });
   }

   static async verificationMail(user, code) {
      this.name = 'DIS-TODO Verification';
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
