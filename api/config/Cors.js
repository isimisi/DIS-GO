import Env from '#config/Env';

export default {
   origin:
      Env.get('NODE_ENV') === 'production'
         ? 'https://134.122.73.248/'
         : ['http://localhost:3000', 'https://localhost:3000'],
   credentials: true,
};
