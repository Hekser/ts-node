import express from 'express';

import { mongoConnect } from './utils/database';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

mongoConnect()
  .then(() => {
    app.listen(port, err => {
      if (err) {
        return console.error(err);
      }

      return console.log(`server is listening on ${port}`);
    });
  })
  .catch((err: any) => {
    console.log(`DB error: ${err}`);
  });
