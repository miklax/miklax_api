import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.send('miklax.com v2');
});

app.listen(3000, () => {
  console.info('API je pokrenut na portu 3000');
});
