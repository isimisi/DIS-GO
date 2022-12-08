import Env from '#config/Env';
import sqlite from 'better-sqlite3';
import session from 'express-session';
import SqliteStore from 'better-sqlite3-session-store';

const Store = SqliteStore(session);
const db = new sqlite('./tmp/session.db');

export default {
   secret: Env.get('SESSION_TOKEN_SECRET'),
   store: new Store({
      client: db,
      expired: {
         clear: true,
         intervalMs: 900000, //ms = 15min
      },
   }),
   resave: false,
   saveUninitialized: true,
   cookie: {
      httpOnly: true,
      secure: false,
      // sameSite: 'none',
      maxAge: 10*24*60*60*1000
   },
};
