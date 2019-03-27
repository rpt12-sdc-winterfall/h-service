const express = require('express');
const morgan = require('morgan');
const { review } = require('../db/models.js');

const port = 3003;
const app = express();
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(`${__dirname}/../public`));
app.use(morgan('dev'));

app.get('/reviews', (req, res) => {
  review.find({}).exec()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});
