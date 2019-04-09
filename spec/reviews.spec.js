/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import Reviews, { StarRating, ReviewDescription } from '../client/src/components/Reviews';

let wrapper;

beforeAll(() => {
  // mock the fetch API get requests
  fetchMock
    .get('http://localhost:3003/reviews/20', [
      {
        _id: 911,
        id: 20,
        image_url: 'https://pixel.nymag.com/imgs/daily/vulture/2017/03/30/30-chandler-bing.w330.h330.jpg',
        reviewer_name: 'Jamal',
        star_rate: 3,
        review_date: '5 May',
        review_description: 'some content reviewing a book',
        likes_count: 100,
      },
    ]);

  wrapper = shallow(<Reviews />);
});

describe('shallow rendering the reviews component', () => {
  it('renders one StarRating component', (done) => {
    // to make sure the callback runs after the asynchronous AJAX call within
    // the component has finished. It runs the callback in the next iteration
    // of the Event Loop
    process.nextTick(() => {
      expect(wrapper.find(StarRating).exists()).toBe(true);
      done();
    });
  });

  it('should be selectable by id "reviews"', (done) => {
    process.nextTick(() => {
      expect(wrapper.is('#reviews')).toBe(true);
      done();
    });
  });

  it('should render the expected review description', (done) => {
    process.nextTick(() => {
      expect(wrapper.find(ReviewDescription).text()).toBe('some content reviewing a book');
      done();
    });
  });

  it('should render the expected number of likes', (done) => {
    process.nextTick(() => {
      expect(wrapper.find('.likes_count').text()).toBe('100');
      done();
    });
  });
});
