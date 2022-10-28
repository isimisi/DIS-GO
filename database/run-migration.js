import database from './index.js';

console.log('Running migration...');

let sql = `CREATE TABLE IF NOT EXISTS hosts( id INTEGER PRIMARY KEY, host TEXT NOT NULL UNIQUE, ping REAL NOT NULL )`;

database.run(sql, (error) => {
   if (error) return console.log(error);
   console.log('Successfully ran migration');
});
