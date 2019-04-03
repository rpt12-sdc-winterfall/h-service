import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Reviews extends React.Component {
  static like(event) {
    const reviewId = {
      reviewId: event.target.parentNode.parentNode.getAttribute('review_id'),
      likes_count: event.target.previousSibling.textContent,
    };

    fetch('http://localhost:3003/review', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewId),
    })
      .catch((err) => {
        console.log(err);
      });
  }

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

  render() {
    const { reviews } = this.state;

    const renderedReviews = reviews.map(review => (
      <div key={review._id} review_id={review._id} className="review">
        <div className="review-header">
          <img alt="" src={review.image_url} />
          <p>{review.reviewer_name}</p>
          <StarRatingComponent name="review_rate" value={review.star_rate} starColor="#f65" emptyStarColor="#ddd" editing={false} />
          <p>{review.review_date}</p>
        </div>
        <div className="review-description">
          {review.review_description}
        </div>
        <div className="review-footer">
          <p className="likes_count">{review.likes_count}</p>
          <button type="submit" onClick={(event) => { Reviews.like(event); }}>Like</button>
        </div>
      </div>
    ));

    return (
      <div id="reviews">
        {renderedReviews}
      </div>
    );
  }
}

export default Reviews;
