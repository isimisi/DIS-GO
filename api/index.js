import express from 'express';
import cors from 'cors';
import session from 'express-session';

import corsConfig from '#config/Cors';
import sessionConfig from '#config/Session';
import Env from '#config/Env';

import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import todoListsRouter from './routes/todoLists.js';
import personalTodoRouter from './routes/personalTodos.js';
import todoRouter from './routes/todo.js';

import roundRobin from './round-robin.js';

const httpsPort = Env.get('HTTPS_PORT');

const app = express();
const redirectServer = express();

redirectServer.use(cors(corsConfig));

app.use(cors(corsConfig));
app.set('trust proxy', 1);
redirectServer.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

// app.use(function (req, res, next) {
//    res.header('Access-Control-Allow-Credentials', true);
//    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//    // res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
//    res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-   Type, Accept, Authorization'
//    );
//    next();
// });

redirectServer.all('*', (request, response) => {
   const httpsURL = `https://${request.hostname}:${httpsPort}${request.originalUrl}`;
   response.redirect(httpsURL);
});

app.get('/', function (req, res) {
   res.send(
      `<img src="https://w0.peakpx.com/wallpaper/396/980/HD-wallpaper-racoons-cup-animal-animals-cute-raccoon-wholesome.jpg">`
   );
});

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/personaltodos', personalTodoRouter);
app.use('/todolist', todoListsRouter);

roundRobin(app, redirectServer);
