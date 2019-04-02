/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Review from '../client/src/components/Reviews';

describe('testing react', () => {
  it('a test case ...', () => {
    expect(2 + 2).toEqual(4);
  });

  it('should render without throwing an error', () => {
    expect(shallow(<Review />).contains(<h1 className="test">Reviews</h1>)).toBe(true);
  });

  it('should be selectable by class "test"', () => {
    expect(shallow(<Review />).is('.test')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Review />).find('.test').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(<Review />).text()).toEqual('Reviews');
  });
});
