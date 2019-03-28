/* You'll need to have the express server running
 * for these tests to pass. */

const { expect } = require('chai');
const request = require('request');

describe('the server', () => {
  it('the data/documents are in the right format & adhere to the schema', (done) => {
    request('http://localhost:3003/reviews/20', (error, response, body) => {
      const result = JSON.parse(body);
      const review = result[0];

      expect(review).to.have.all.keys('_id', 'id', 'image_url', 'reviewer_name', 'star_rate', 'review_date', 'review_description', 'likes_count');
      done();
    });
  });

  it('the reviews are the ones associated to the book through its id', (done) => {
    request('http://localhost:3003/reviews/20', (error, response, body) => {
      const result = JSON.parse(body);

      for (let i = 0; i < result.length; i += 1) {
        expect(result[i].id).to.equal(20);
      }

      done();
    });
  });
});
