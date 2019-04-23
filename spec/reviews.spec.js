/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import Reviews from '../client/src/components/Reviews';
import Review, { StarRating, ReviewDescription } from '../client/src/components/Review';

let ReviewsWrapper;
let ReviewWrapper;

beforeAll(() => {
  const mockReview = {
    _id: '911',
    id: 20,
    image_url: 'https://pixel.nymag.com/imgs/daily/vulture/2017/03/30/30-chandler-bing.w330.h330.jpg',
    reviewer_name: 'Jamal',
    star_rate: 3,
    review_date: '5 May',
    review_description: 'some content reviewing a book',
    likes_count: 100,
  };
  // mock the fetch API get requests
  fetchMock
    .get('/reviews/0', [
      mockReview,
    ]);

  ReviewsWrapper = shallow(<Reviews />);
  ReviewWrapper = shallow(<Review review={mockReview} />);
});

describe('shallow rendering the reviews component & its subcomponent', () => {
  it('the Reviews component should be selectable by id "reviews"', (done) => {
    process.nextTick(() => {
      expect(ReviewsWrapper.is('#reviews')).toBe(true);
      done();
    });
  });

  it('the Review component should render one StarRating component', (done) => {
    // to make sure the callback runs after the asynchronous AJAX call within
    // the component has finished. It runs the callback in the next iteration
    // of the Event Loop
    process.nextTick(() => {
      expect(ReviewWrapper.find(StarRating).exists()).toBe(true);
      done();
    });
  });

  it('The Review component should render the expected review description', (done) => {
    process.nextTick(() => {
      expect(ReviewWrapper.find(ReviewDescription).text()).toBe('some content reviewing a book');
      done();
    });
  });

  it('The Review component should render the expected number of likes', (done) => {
    process.nextTick(() => {
      expect(ReviewWrapper.find('.likes_count').text()).toBe('100');
      done();
    });
  });
});
