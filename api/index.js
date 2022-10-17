import express from 'express';
import Env from '#config/Env';
import startupMsg from './utils/cli-box.js';
import userController from './App/Controllers/UserController.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import User from './App/Models/User.js';
import todoRouter from './routes/todo.js';

const port = Env.get('PORT');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.post('/test', async (req, res) => {
   const { email } = req.body;
   const user = await User.where('email = ?', email);
   res.json(user);
});

app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/', authRouter);

app.listen(port, () => {
   console.log(startupMsg);
});
