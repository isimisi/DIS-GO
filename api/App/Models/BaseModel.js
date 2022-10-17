import database from '../../database/index.js';

export default class BaseModel {
   static tableName = '';

   static columns = [];

   static all() {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM ${this.tableName}`;
         database.all(sql, [], function (error, rows) {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

   static find(id) {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
         database.all(sql, [id], function (error, rows) {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

   static where(query, ...args) {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM ${this.tableName} WHERE ${query}`;
         database.all(sql, [args], function (error, rows) {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

   /**
    *
    * @param {*} data
    * @returns integer
    */
   static create(data) {
      let sql = `INSERT INTO ${this.tableName}(`;
      this.columns.forEach((column, index, array) => {
         sql += column;

         if (index !== array.length - 1) sql += ',';
      });
      sql += ') VALUES (';

      this.columns.forEach((column, index, array) => {
         sql += '?';

         if (index !== array.length - 1) sql += ',';
      });

      sql += ')';

      return new Promise((resolve, reject) => {
         database.run(sql, Object.values(data), function (error) {
            if (error) return reject(error);
            resolve(this.lastID);
         });
      });
   }

   /**
    *
    * @param {{[string]: value}} values
    */
   static update(values, id) {
      let sql = `UPDATE ${this.tableName} SET `;
      const newValues = [];
      Object.entries(values).forEach(([key, value], index, array) => {
         sql += `${key} = ?`;
         if (index !== array.length - 1) sql += ', ';
         else sql += ' ';
         newValues.push(value);
      });

      sql += `WHERE id = ?`;

      return new Promise((resolve, reject) => {
         database.run(sql, [...newValues, id], function (error) {
            if (error) return reject(error);
            resolve();
         });
      });
   }

   static remove(id) {
      const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
      return new Promise((resolve, reject) => {
         database.run(sql, [id], function (error) {
            if (error) return reject(error);
            resolve();
         });
      });
   }

   static last() {
      const sql = `SELECT * FROM ${this.tableName} ORDER BY id DESC LIMIT 1`;

      return new Promise((resolve, reject) => {
         database.all(sql, [], function (error, rows) {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }
}
