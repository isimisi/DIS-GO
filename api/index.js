import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { createServer } from 'https';
import { createServer as httpCreate } from 'http';

import corsConfig from '#config/Cors';
import sessionConfig from '#config/Session';
import Env from '#config/Env';
import httpsOptions from '#config/Https';

import startupMsg from './utils/cli-box.js';

import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import todoRouter from './routes/todo.js';
import Mail from './App/Services/MailService(deprecated).js';

const port = Env.get('PORT');
const httpsPort = Env.get('HTTPS_PORT');

const app = express();
const redirectServer = express();

redirectServer.all('*', (request, response) => {
   const httpsURL = `https://${request.hostname}:${httpsPort}`;
   response.redirect(httpsURL);
});

app.use(cors(corsConfig));
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use(function(req, res, next) {

   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
   // res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-   Type, Accept, Authorization");
   next();
   });

app.get('/', function (req, res) {
   res.send(
      `<img src="https://w0.peakpx.com/wallpaper/396/980/HD-wallpaper-racoons-cup-animal-animals-cute-raccoon-wholesome.jpg">`
   );
});

app.post('/mail', async function (request, response) {
   const { subject, text } = request.body;

   try {
      await Mail.verificationMail(
         { first_name: 'Isaac', email: 'isaacj.ahmad@gmail.com' },
         5685
      );
      response.send('ok');
   } catch (error) {
      console.log(error);
      response.status(404).send('err');
   }
});

app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/', authRouter);

// redirectServer.listen(port);

app.listen(3333, () => console.log('listening on port 3333'));

// createServer(httpsOptions, app).listen(httpsPort, function () {
//    console.log(startupMsg);
// });
