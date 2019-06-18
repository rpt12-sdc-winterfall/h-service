/* eslint-disable import/no-extraneous-dependencies */
require('newrelic');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../db/models.js');
const connection = db.connection;

const port = process.env.PORT || 3008;
const app = express();
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(`${__dirname}/../public`));
app.use('/:id', express.static(`${__dirname}/../public`));
app.use(morgan('dev'));
app.use(cors());

app.get('/reviews/:id', (req, res) => {
  connection.query(`SELECT * FROM reviews WHERE book_id = ${req.params.id}`, (err, data) => {
    if (err) res.status(501).send('Error in get req on server:', err);
    else res.send(data);
  });
});


//handle post request to server
app.post('/addreview', (req, res) => {
  const newReview = Object.keys(req.body);
  var cols = '';
  var values = '';
  newReview.forEach(col => {
    values += `"${req.body[col]}", `;
    cols += `${col}`;
  });
  cols = cols.slice(0, -2);
  values = values.slice(0, -2);

  connection.query(`INSERT INTO reviews (${cols}) VALUES (${values})`, (err) => {
    if (err) res.status(501).send('Error in post req on server:', err);
    else res.status(201).send('New review successfully added to db!');
  });
});

//handle delete request to server
app.delete('/removereview/:id', (req, res) => {
  const reviewID = req.params.id;
  connection.query(`DELETE FROM reviews WHERE id = ${reviewID}`, (err) => {
    if (err) res.status(500).send('Error in post req on server:', err);
    else res.status(200).send('Successfully deleted review in db!');
  });
  // review.findOneAndDelete({ id: reviewID}).exec()
  //   .then((removed) => {
  //     res.status(200).send('Successfully deleted review in DB!', removed);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).send('Error in DELETE req for server!');
  //   })
});

const jsonParser = bodyParser.json();
app.patch('/review', jsonParser, (req, res) => {
  const reviewID = req.body.reviewId;
  let newLikesCount;
  if (req.body.likedStatus === 'like') {
    newLikesCount = req.body.likesCount + 1;
  } else {
    newLikesCount = req.body.likesCount - 1;
  }

  connection.query(`UPDATE reviews SET likes_count = ${newLikesCount} WHERE id = ${reviewID}`, (err) => {
    if (err) res.status(500).send('Error updating review likes count in db:', err);
    else res.status(200).send('Successfully updated review likes count in DB!');
  });
  // review.findOneAndUpdate(
  //   { _id: req.body.reviewId },
  //   { likes_count: newLikesCount },
  //   {
  //     useFindAndModify: false,
  //     new: true,
  //   },
  // ).exec()
  //   .then((updatedReview) => {
  //     res.send(updatedReview);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send('Something went wrong!...');
  //   });
});
