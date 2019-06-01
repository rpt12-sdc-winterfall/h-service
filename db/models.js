const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/reviews', { useNewUrlParser: true });

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
  review_date: String,
  review_description: String,
  likes_count: Number,
  review_id: Number,
}, {
  versionKey: false,
});

const review = mongoose.model('review', reviewSchema);

module.exports = {
  review,
};
