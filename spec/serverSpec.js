/* You'll need to have the express server running
 * for these tests to pass. */

const { expect } = require('chai');
const request = require('request');

describe('the server', () => {
  it('get all the reviews when sending a /reviews GET request', (done) => {
    request('http://localhost:3003/reviews', (error, response, body) => {
      const result = JSON.parse(body);
      expect(result).to.have.lengthOf(10000);
      done();
    });
  });

  it('the data/documents are in the right format & adhere to the schema', (done) => {
    request('http://localhost:3003/reviews', (error, response, body) => {
      const result = JSON.parse(body);
      const review = result[0];

      expect(review).to.have.property('image_url');
      expect(review).to.have.property('reviewer_name');
      expect(review).to.have.property('star_rate');
      expect(review).to.have.property('review_date');
      expect(review).to.have.property('review_description');
      expect(review).to.have.property('likes_count');
      done();
    });
  });
});
