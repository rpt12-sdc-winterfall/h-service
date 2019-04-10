/* You'll need to have the express server running
 * for these tests to pass. */

const { expect } = require('chai');
const axios = require('axios');

describe('the server', () => {
  let result;

  // runs before all tests in this block
  beforeAll(() => axios('http://localhost:3003/reviews/20')
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log(err);
    }));

  it('the data/documents are in the right format & adhere to the schema', () => {
    const review = result[0];

    expect(review).to.have.all.keys('_id', 'id', 'image_url', 'reviewer_name', 'star_rate', 'review_date', 'review_description', 'likes_count');
  });

  it('the displayed reviews are for the current book being viewed', () => {
    for (let i = 0; i < result.length; i += 1) {
      expect(result[i].id).to.equal(20);
    }
  });

  it('should update the likes count for the specified review', () => {
    const oldLikesCount = result[0].likes_count;

    const review = {
      reviewId: result[0]._id,
      likes_count: oldLikesCount,
    };

    return axios.patch('http://localhost:3003/review', review)
      .then(() => axios.get('http://localhost:3003/reviews/20'))
      .then(response => response.data[0])
      .then((updatedReview) => {
        expect(updatedReview.likes_count).to.equal(oldLikesCount + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
