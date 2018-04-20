import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import connectToDb from './db/connect';
import blog from './routes/blog.router';
import config from './config/config';

const app = express();

// init connect to mongo
connectToDb();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.send('miklax.com v2');
});

app.use('/blog', blog);

app.listen(3000, () => {
  console.info('API je pokrenut na portu %d', config.port);
});
