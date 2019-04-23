import React from 'react';
import { PropTypes } from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import styled from 'styled-components';

const ReviewWrapper = styled.div`
  margin-bottom: 1.7em;

  :after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Img = styled.img`
  float: left;
  max-width: 50px;
  margin-right: 0.625em;
  cursor: pointer;
`;

const Review = styled.div`
  float: left;
  width: 55%;
`;

const ReviewHeader = styled.div`
  margin-bottom: 0.625em;
`;

const Reviewer = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: #00635d;
  cursor: pointer;
  line-height: 1.3;
`;

export const StarRating = styled(StarRatingComponent)`
  line-height: 1.125em;
  font-size: 1.125em;
  vertical-align: top;
  margin-right: 2em;
`;

const ReviewDate = styled.a`
  float: right;
  color: #bbb;
`;

export const ReviewDescription = styled.div`
  font-family: "Merriweather", "Georgia", serif;
  margin-top: 0.5em;
  margin-bottom: 0.625em;
  line-height: 1.5em;
  color: #181818;
`;

const ReviewFooter = styled.div`
`;

const Likes = styled.a`
  color: #00635d;
  margin-right: 1.1em;
`;

const Button = styled.button`
  font-size: 0.688em;
  color: #333;
  padding: 4px 12px;
  border-radius: 3px;
  border: 1px solid #D6D0C4;
  cursor: pointer;
  background-color: #F4F1EA;
  line-height: 1;
`;

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedStatus: 'like',
      likesCount: props.review.likes_count,
    };
  }

  like() {
    const { review } = this.props;
    const reviewId = review._id;
    const { likesCount, likedStatus } = this.state;

    const reviewInfos = {
      reviewId,
      likesCount,
      likedStatus,
    };

    fetch('/review', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewInfos),
    })
      .then(response => response.json())
      .then((updatedReview) => {
        this.setState(() => (
          {
            likesCount: updatedReview.likes_count,
          }
        ));
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState((prevState) => {
      if (prevState.likedStatus === 'like') {
        return {
          likedStatus: 'unlike',
        };
      }

      return {
        likedStatus: 'like',
      };
    });
  }

  render() {
    const { review } = this.props;
    const { likedStatus } = this.state;
    const { likesCount } = this.state;

    return (
      <ReviewWrapper>
        <Img alt="" src={review.image_url} />
        <Review id={review._id}>
          <ReviewHeader>
            <Reviewer>
              {review.reviewer_name}
            </Reviewer>
            {' rated it '}
            <StarRating name="review_rate" value={review.star_rate} starColor="#f65" emptyStarColor="#ddd" editing={false} />
            <ReviewDate>{review.review_date}</ReviewDate>
          </ReviewHeader>
          <ReviewDescription>
            {review.review_description}
          </ReviewDescription>
          <ReviewFooter>
            <Likes>
              <span className="likes_count">
                { likesCount }
              </span>
              {' likes'}
            </Likes>
            <Button type="submit" onClick={() => { this.like(); }}>{ likedStatus }</Button>
          </ReviewFooter>
        </Review>
      </ReviewWrapper>
    );
  }
}

ReviewComponent.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.number,
    image_url: PropTypes.string,
    reviewer_name: PropTypes.string,
    star_rate: PropTypes.number,
    review_date: PropTypes.string,
    review_description: PropTypes.string,
    likes_count: PropTypes.number,
  }).isRequired,
};

export default ReviewComponent;
