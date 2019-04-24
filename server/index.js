/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { review } = require('../db/models.js');

const port = process.env.PORT || 3003;
console.log(port);
const app = express();
app.listen(port, () => console.log(`listening on port ${port}`));

app.use('/:id', express.static(`${__dirname}/../public`));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.redirect('/0');
});

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
  let newLikesCount;
  if (req.body.likedStatus === 'like') {
    newLikesCount = req.body.likesCount + 1;
  } else {
    newLikesCount = req.body.likesCount - 1;
  }

  review.findOneAndUpdate(
    { _id: req.body.reviewId },
    { likes_count: newLikesCount },
    {
      useFindAndModify: false,
      new: true,
    },
  ).exec()
    .then((updatedReview) => {
      res.send(updatedReview);
    })
    .catch((err) => {
      console.log(err);
      res.send('Something went wrong!...');
    });
});
