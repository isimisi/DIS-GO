import Env from '#config/Env';

export default {
   secret: Env.get('SESSION_TOKEN_SECRET'),
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false },
};
