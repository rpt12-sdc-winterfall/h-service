import React from 'react';

class Reviews extends React.Component {
  static like(event) {
    const reviewId = {
      reviewId: event.target.parentNode.parentNode.getAttribute('reviewid'),
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
    this.reviewRef = React.createRef();
  }

  componentDidMount() {
    fetch('http://localhost:3003/reviews/20')
      .then((result) => {
        return result.json();
      })
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
      <div key={review._id} reviewid={review._id} ref={this.reviewRef} className="review">
        <div className="review-header">
          <img alt="" src={review.image_url} />
          <p>{review.reviewer_name}</p>
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
