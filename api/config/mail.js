import Env from '#config/Env';

export default {
   apiKey: Env.get('MAILGUN_API_KEY'),
   domain: Env.get('DOMAIN'),
};

// export default {
//    name: 'noreply',
//    host: Env.get('MAIL_HOST'),
//    port: Env.get('MAIL_PORT'),
//    secure: Env.get('MAIL_PORT') === 465,
//    auth: {
//       user: Env.get('MAIL_USER'),
//       pass: Env.get('MAIL_PASSWORD'),
//    },
//    ...(Env.get('MAIL_PORT') !== 465 && {
//       tls: {
//          rejectUnauthorized: false,
//       },
//    }),
// };
