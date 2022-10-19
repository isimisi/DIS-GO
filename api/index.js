import express from 'express';
import Env from '#config/Env';
import startupMsg from './utils/cli-box.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import todoRouter from './routes/todo.js';
import cors from 'cors';

const port = Env.get('PORT');
const app = express();

app.use('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/', authRouter);

app.listen(port, () => {
   console.log(startupMsg);
});
