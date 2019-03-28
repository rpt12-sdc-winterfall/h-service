const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/reviews', { useNewUrlParser: true });

// check the connection to the database.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('we\'re connected');
});

const reviewSchema = new mongoose.Schema({
  id: Number,
  image_url: String,
  reviewer_name: String,
  star_rate: Number,
  review_date: Date,
  review_description: String,
  likes_count: Number,
}, {
  versionKey: false,
});

const review = mongoose.model('review', reviewSchema);

module.exports = {
  review,
};
