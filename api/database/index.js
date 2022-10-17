import sqlite3 from 'sqlite3';
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const database = new sqlite3.Database(
   path.join(__dirname, 'DIS.db'),
   sqlite3.OPEN_READWRITE,
   (error) => {
      if (error) return console.log(error);
   }
);

export default database;
