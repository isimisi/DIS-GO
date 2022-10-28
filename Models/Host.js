import database from '../database/index.js';

export default class Host {
   static id = null;

   static create(host, rtt) {
      const sql = `INSERT INTO hosts (host, ping) VALUES (?, ?)`;

      const thisClass = this;
      return new Promise((resolve, reject) => {
         database.run(sql, [host, rtt], function (error) {
            if (error) return reject(error);
            thisClass.id = this.lastID;
            resolve(thisClass);
         });
      });
   }

   static find(id) {
      if (this.id) {
         return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM hosts WHERE id = ?`;
            database.all(sql, [this.id], function (error, rows) {
               if (error) return reject(error);
               resolve(rows);
            });
         });
      } else {
         return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM hosts WHERE id = ?`;
            database.all(sql, [id], function (error, rows) {
               if (error) return reject(error);
               resolve(rows);
            });
         });
      }
   }

   static all() {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM hosts`;
         database.all(sql, [], function (error, rows) {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

   static where(query, ...args) {
      const host = this;
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM hosts WHERE ${query} = ?`;
         database.all(sql, [args], function (error, rows) {
            if (error) return reject(error);
            host.id = rows[0].id;
            resolve(host);
         });
      });
   }

   static update(ping) {
      let sql = `UPDATE hosts SET ping = ? WHERE id = ?`;

      return new Promise((resolve, reject) => {
         database.run(sql, [ping, this.id], function (error) {
            if (error) return reject(error);
            resolve();
         });
      });
   }
}
