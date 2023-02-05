import { Server } from 'socket.io';
import { createServer } from 'https';
import http from 'http'

import httpsConfig from '#config/Https'
import corsConfig from '#config/Cors';
import Env from '#config/Env'

export class SocketIO {
   constructor(app) {
      this.http = +Env.get('ENABLE_HTTPS') ? createServer(httpsConfig, app) : http.createServer(app);
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
