import { Server } from 'socket.io';
import { createServer } from 'http';

import corsConfig from '#config/Cors';

export class SocketIO {
   constructor(app) {
      this.http = createServer(app);
   }

   io = null;
   _booted = false;

   boot() {
      if (this._booted) {
         return;
      }

      this._booted = true;

      this.io = new Server(this.http, {
         cors: corsConfig,
      });

   }


   listen(port, cb) {
      this.http.listen(port, cb);
   }
}

export default function Socket(app) {
   return new SocketIO(app);
}