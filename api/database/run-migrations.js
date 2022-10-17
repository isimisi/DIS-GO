import fs from 'fs';
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

(async () => {
   const migationPath = path.join(__dirname, '.', 'migrations');
   const migrations = fs
      .readdirSync(migationPath)
      .filter((file) => file.endsWith('.js'));

   console.log('Running migrations...');

   try {
      for (const file of migrations) {
         const migration = await import(`./migrations/${file}`);

         await migration.default.run();
      }
      console.log('Successfully ran migrations');
   } catch (error) {
      console.log(error);
   }
})();
