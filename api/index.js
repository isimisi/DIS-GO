import express from 'express';
import Env from '#config/Env';
import startupMsg from './utils/cli-box.js';

const port = Env.get('PORT');
const app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.listen(port, () => {
   console.log(startupMsg);
});
