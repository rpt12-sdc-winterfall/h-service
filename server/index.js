/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { review } = require('../db/models.js');

const port = process.env.PORT || 3008;
const app = express();
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(`${__dirname}/../public`));
app.use('/:id', express.static(`${__dirname}/../public`));
app.use(morgan('dev'));
app.use(cors());

app.get('/reviews/:id', (req, res) => {
  review.find({ id: req.params.id }).exec()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log('Error in GET req for server: ', err);
    });
});

//handle post request to server
app.post('/addreview', (req, res) => {
  const addReview = new review(req.body);
  addReview.save((err) => {
    if (err) {
      res.status(500).send('Error in POST req for server!', err);
    } 
    res.status(201).send('Successfully added new review in DB: ');
  }); 
});

//handle delete request to server
app.delete('/removereview/:id', (req, res) => {
  const reviewID = req.params.id;
  review.findOneAndDelete({ id: reviewID}).exec()
    .then((removed) => {
      res.status(200).send('Successfully deleted review in DB!', removed);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error in DELETE req for server!');
    })
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
