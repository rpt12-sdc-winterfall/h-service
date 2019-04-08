import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 14px;
  font-family: "Lato", "Helvetica", "sans-serif";
`;

const ReviewWrapper = styled.div`
  margin-bottom: 1.5em;

  :after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Img = styled.img`
  float: left;
  max-width: 50px;
  margin-right: 10px;
  cursor: pointer;
`;

const Review = styled.div`
  float: left;
  width: 540px;
`;

const ReviewHeader = styled.div`
  margin-bottom: 10px;
`;

const Reviewer = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: #00635d;
  cursor: pointer;
  line-height: 18px;
`;

const StarRating = styled(StarRatingComponent)`
  line-height: 18px;
  font-size: 18px;
  vertical-align: top;
`;

const ReviewDate = styled.a`
  float: right;
  color: #bbb;
`;

const ReviewDescription = styled.div`
  font-family: "Merriweather", "Georgia", serif;
  margin-bottom: 10px;
  line-height: 21px;
  color: #181818;
`;

const ReviewFooter = styled.div`
`;

const Likes = styled.a`
  color: #00635d;
  margin-right: 16px;
`;

const Button = styled.button`
  font-size: 11px;
  color: #333;
  padding: 4px 12px;
  border-radius: 3px;
  border: 1px solid #D6D0C4;
  cursor: pointer;
  background-color: #F4F1EA;
  line-height: 1;
`;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3003/reviews/20')
      .then(result => result.json())
      .then((result) => {
        this.setState(() => (
          {
            reviews: result,
          }
        ));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  like(event) {
    const reviewId = {
      reviewId: event.target.parentNode.parentNode.getAttribute('id'),
      likes_count: event.target.previousSibling.firstChild.textContent,
    };

    fetch('http://localhost:3003/review', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewId),
    })
      .then(() => {
        this.componentDidMount();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { reviews } = this.state;

    const renderedReviews = reviews.map(review => (
      <ReviewWrapper key={review._id}>
        <Img alt="" src={review.image_url} />
        <Review id={review._id}>
          <ReviewHeader>
            <Reviewer>
              {review.reviewer_name}
            </Reviewer>
            { ' rated it ' }
            <StarRating name="review_rate" value={review.star_rate} starColor="#f65" emptyStarColor="#ddd" editing={false} />
            <ReviewDate>{review.review_date}</ReviewDate>
          </ReviewHeader>
          <ReviewDescription>
            {review.review_description}
          </ReviewDescription>
          <ReviewFooter>
            <Likes>
              <span>
                {review.likes_count}
              </span>
              {' likes'}
            </Likes>
            <Button type="submit" onClick={(event) => { this.like(event); }}>Like</Button>
          </ReviewFooter>
        </Review>
      </ReviewWrapper>
    ));

    return (
      <Wrapper id="reviews">
        {renderedReviews}
      </Wrapper>
    );
  }
}

export default Reviews;
