import * as sqlite3 from 'sqlite3';
import express from 'express';
import * as session from 'express-session';
import sqliteStoreFactory from 'express-session-sqlite';

const SqliteStore = sqliteStoreFactory.default(session);
const app = express();

app.use(
   session({
      store: new SqliteStore({
         // Database library to use. Any library is fine as long as the API is compatible
         // with sqlite3, such as sqlite3-offline
         driver: sqlite3.Database,
         // for in-memory database
         // path: ':memory:'
         path: '/tmp/sqlite.db',
         // Session TTL in milliseconds
         ttl: 1234,
         // (optional) Session id prefix. Default is no prefix.
         prefix: 'sess:',
         // (optional) Adjusts the cleanup timer in milliseconds for deleting expired session rows.
         // Default is 5 minutes.
         cleanupInterval: 300000,
      }),
      resave: false,
      saveUninitialized: true,
      cookie: {
         secure: Env.get('NODE_ENV') === 'production',
         sameSite: Env.get('NODE_ENV') === 'production' ? 'none' : false,
      },
   })
);

app.listen(6000, () => console.log('listening..'));
