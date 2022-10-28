import express, { response } from 'express';
import { join } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import icmp from 'icmp';

import * as corsConfig from './config/Cors.js';
import Env from './config/Env.js';
import { ValidIpOrHostNameRegex } from './utils/regex.js';
import Host from './Models/Host.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const PORT = Env.get('PORT');
const app = express();

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(cors(corsConfig));

app.get('/ping', async (request, response) => {
   try {
      const { host } = request.query;

      if (!host) response.status(400).send('No host was provided');

      if (host.match(ValidIpOrHostNameRegex) === null)
         return response
            .status(400)
            .send('The hostname or IP you entered is invalid.');

      let sum = 0;

      for (let i = 0; i < 10; i++) {
         const res = await icmp.send(host, 'Ping', 1000);
         if (!res.elapsed)
            return response.status(400).send('The host did not respond - try something else!');
         sum += res.elapsed;
      }

      const averageRTT = sum / 10;

      try {
         await Host.create(host, averageRTT);
      } catch (error) {
         await (await Host.where('host', host)).update(averageRTT);
      }

      response.json({
         averageRTT,
         host,
      });
   } catch (error) {
      response.status(500).json(error);
   }
});

app.get('/list', (request, response) => {
   response.sendFile(join(__dirname, 'public', 'list.html'), {}, (error) => {
      if (error) response.status(500).json(error);
   });
});

app.get('/hosts', async (request, response) => {
   try {
      const hosts = await Host.all();
      response.json(hosts);
   } catch (error) {
      response.status(500).json(error);
   }
});

app.get('*', (request, response) => {
   response.status(404).json({
      error: {
         errorCode: 404,
         message: 'Page not found',
      },
   });
});

app.listen(PORT, () => {
   console.log('Server listening on port:', +PORT);
});
