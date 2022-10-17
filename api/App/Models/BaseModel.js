import database from '../../database.js';

export default class BaseModel {
   static tableName = '';

   static columns = [];

   static all() {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM ${this.tableName}`;
         database.all(sql, [], (error, rows) => {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

   static find(id) {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
         database.all(sql, [], (error, rows) => {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

   static where(query) {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM ${this.tableName} WHERE ${query}`;
         database.all(sql, [], (error, rows) => {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

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
         database.run(sql, data, (error) => {
            if (error) return reject(error);
            resolve();
         });
      });
   }

   /**
    *
    * @param {{[string]: value}} values
    */
   static update(values, id) {
      let sql = `UPDATE ${this.tableName} SET`;
      const newValues = [];
      Object.entries(values).forEach(([key, value]) => {
         sql += `${key} = ?`;
         newValues.push(value);
      });

      sql += `WHERE id = ?`;

      return new Promise((resolve, reject) => {
         database.run(sql, [...newValues, id], (error) => {
            if (error) return reject(error);
            resolve();
         });
      });
   }

   static remove(id) {
      const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
      database.run(sql, [id], (error) => {
         if (error) return reject(error);
         resolve();
      });
   }
}
