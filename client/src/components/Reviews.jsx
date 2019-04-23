import React from 'react';
import styled from 'styled-components';
import Review from './Review';

const Wrapper = styled.div`
  font-size: 0.875em;
  font-family: "Lato", "Helvetica", "sans-serif";
  margin-left: 3em;
`;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    const bookId = Number(window.location.pathname.split('/')[1]);

    fetch(`/reviews/${bookId}`)
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
    this.componentDidMount = this.componentDidMount.bind(this);
    const { reviews } = this.state;

    const renderedReviews = reviews.map(review => (
      <Review key={review._id} review={review} />
    ));

    return (
      <Wrapper id="reviews">
        {renderedReviews}
      </Wrapper>
    );
  }
}

export default Reviews;
