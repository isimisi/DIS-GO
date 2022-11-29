import dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({
   path: path.join(__dirname, '..', '.env'),
});

export default class Env {
   /**
    *
    * @param {'PORT' | 'ACCESS_TOKEN_SECRET' | 'REFRESH_TOKEN_SECRET'} string
    */
   static get(string) {
      const env = process.env[string];

      if (!env) throw new Error(`${string} does not exist in .env`);

      return env;
   }
}
