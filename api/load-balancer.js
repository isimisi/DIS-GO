import cluster from 'cluster';
import https from 'https';
import os from 'os';
import { setupMaster, setupWorker } from '@socket.io/sticky';
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';
import Socket from '#App/Services/SocketService';
import TodoSocketController from '#App/Controllers/Ws/TodoController';
import startupMsg from './utils/cli-box.js';
import httpsConfig from '#config/Https';
import Env from '#config/Env';

const httpsPort = Env.get('HTTPS_PORT');
const redirectPort = Env.get('PORT');

export default function loadBalancer(
   app,
   redirectServer,
   numOfCPU = os.cpus().length,
   port = httpsPort
) {
   if (cluster.isPrimary) {
      console.log(`Primary ${process.pid} is running...`);

      const httpsServer = https.createServer(httpsConfig);

      setupMaster(httpsServer, {
         loadBalancingMethod: 'least-connection',
      });

      setupPrimary();

      httpsServer.listen(8080);
      redirectServer.listen(redirectPort);

      for (let i = 0; i < numOfCPU; i++) {
         cluster.fork();
      }
      console.clear();
      console.log(startupMsg(httpsPort));

      cluster.on('exit', (worker) => {
         console.log(`Worker ${worker.process.pid} died`);
         cluster.fork();
      });
   } else {
      console.log(`Worker ${process.pid} started`);

      const socket = Socket(app);
      socket.boot();
      socket.io.adapter(createAdapter());
      setupWorker(socket.io);

      TodoSocketController(socket);

      socket.listen(port, () => {
         console.log(`Worker ${process.pid} started`);
      });
   }
}
