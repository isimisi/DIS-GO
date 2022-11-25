import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { createServer } from 'https';

import corsConfig from '#config/Cors';
import sessionConfig from '#config/Session';
import Env from '#config/Env';
import httpsOptions from '#config/Https';

import startupMsg from './utils/cli-box.js';

import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import todoRouter from './routes/todo.js';

const port = Env.get('PORT');
const httpsPort = Env.get('HTTPS_PORT');

const app = express();
const redirectServer = express();

redirectServer.all('*', (request, response) => {
   const httpsURL = `https://${request.hostname}:${httpsPort}`;
   response.redirect(httpsURL);
});

app.use(cors(corsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.get('/', function (req, res) {
   res.send(
      `<img src="https://w0.peakpx.com/wallpaper/396/980/HD-wallpaper-racoons-cup-animal-animals-cute-raccoon-wholesome.jpg">`
   );
});

app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/', authRouter);

redirectServer.listen(port);

createServer(httpsOptions, app).listen(httpsPort, function () {
   console.log(startupMsg);
});
