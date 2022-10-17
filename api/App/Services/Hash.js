import bcrypt from 'bcrypt';

export default class Hash {
   static saltRounds = 10;
   /**
    *
    * @param {string} value
    */
   static make(value) {
      return new Promise((resolve, reject) => {
         bcrypt.hash(value, this.saltRounds, function (error, hash) {
            if (error) return reject(error);
            resolve(hash);
         });
      });
   }
   /**
    * @param {string} hashedValue
    * @param {string} plainValue
    */
   static verify(hashedValue, plainValue) {
      return new Promise((resolve, reject) => {
         bcrypt.compare(plainValue, hashedValue, function (error, result) {
            if (error) return reject(error);
            resolve(result);
         });
      });
   }
}
