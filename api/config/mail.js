import Env from '#config/Env';

export default {
   apiKey: Env.get('MAILGUN_API_KEY'),
   domain: Env.get('DOMAIN'),
};
