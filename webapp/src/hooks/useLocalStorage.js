import { AES, enc } from 'crypto-js';
import { useCallback } from 'react';

const salt = process.env.REACT_APP_SALT;

export default function useLocalStorage() {

   const saveToLocalStorage = useCallback((item, state) => {
      try {
         const serializedState = JSON.stringify(state);

         localStorage.setItem(
            item,
            AES.encrypt(serializedState, salt).toString()
         );
      } catch (e) {
         console.warn(e);
      }
   }, []);

   // load string from localStarage and convert into an Object
   // invalid output must be undefined
   const loadFromLocalStorage = useCallback((item) => {
      try {
         const serializedState = localStorage.getItem(item);

         if (serializedState === null) return undefined;

         return JSON.parse(
            AES.decrypt(serializedState, salt).toString(enc.Utf8)
         );
      } catch (e) {
         console.warn(e);
         return undefined;
      }
   }, []);

   const clearLocalStorage = useCallback((item) => {
      localStorage.removeItem(item);
   }, []);

   return { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage };
}
