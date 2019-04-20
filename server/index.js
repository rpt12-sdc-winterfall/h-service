/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { review } = require('../db/models.js');
// || 3003
const port = process.env.PORT;
console.log(port);
const app = express();
app.listen(port, () => console.log(`listening on port ${port}`));

app.use('/:id', express.static(`${__dirname}/../public`));
// app.use(morgan('dev'));
app.use(cors());

app.get('/reviews/:id', (req, res) => {
  review.find({ id: req.params.id }).exec()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

const jsonParser = bodyParser.json();
app.patch('/review', jsonParser, (req, res) => {
  console.log(req.body.reviewId);
  console.log(req.body.likes_count);
  review.findOneAndUpdate(
    { _id: req.body.reviewId },
    { likes_count: Number(req.body.likes_count) + 1 },
    { useFindAndModify: false },
  ).exec()
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.send('Something went wrong!...');
    });
});
