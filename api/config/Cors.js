import Env from '#config/Env';

export default {
   origin:
      Env.get('NODE_ENV') === 'production'
         ? [
              'https://134.122.73.248',
              'http://localhost:3000',
              'https://localhost:3000',
           ]
         : [
              'http://localhost:3000',
              'https://localhost:3000',
              'http://192.168.1.24:3000',
              'http://192.168.0.177:3000',
           ],
   credentials: true,
   optionsSuccessStatus: 200,
};
