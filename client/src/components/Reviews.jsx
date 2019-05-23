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
    const bookId = Number(window.location.pathname.split('/')[1]) || 0;

    fetch(`http://localhost:3008/reviews/${bookId}`)
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
