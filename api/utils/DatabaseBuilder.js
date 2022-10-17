import database from '../database/index.js';

export default class DatabaseBuilder {
   static tableName = '';

   static columns = {};

   static run() {
      let sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}(`;

      Object.entries(this.columns).forEach(([key, value], index, array) => {
         sql += ` "${key}" ${value}`;
         if (index !== array.length - 1) sql += ',';
      });

      if (this.options) {
         sql += `, ${this.options}`;
      }
      sql += ')';

      return new Promise((resolve, reject) => {
         database.run(sql, (error) => {
            if (error) return reject(error);
            resolve();
         });
      });
   }

   static drop() {
      return new Promise((resolve, reject) => {
         database.run(`DROP TABLE ${this.tableName}`, (error) => {
            if (error) return reject(error);
            resolve();
         });
      });
   }
}
