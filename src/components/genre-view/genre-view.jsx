import React from 'react';
import { CardGroup, Button, Card, Col } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './genre-view.scss';
export class GenreView extends React.Component {
    render() {
        const { movies, genre, onBackClick } = this.props;

        return (
            <Card bg="dark" text="light">
                <Card.Header className="text-center" as="h5">
                {genre.Genre.Name}
                </Card.Header>
                <Card.Body className="genre-textarea">
                    <Card bg="dark" text="light">
                        <div className="movie-genre-description">
                            <span className="label">Description: </span>
                            <span className="value">{genre.Genre.Description}</span>
                        </div>
                        <span className="label headline-genre-mini-cards">
                        Selected movies that belong to this genre
                        </span>
                        <CardGroup className="card-group-genre-mini-cards">
                            {movies.map((m) => (
                            <Col
                            md={6}
                            lg={3}
                            key={m._id}
                            className="genre-movie-card-mini"
                            >
                            <Link to={`/movies/${m._id}`}>
                                <Card className="h-100" bg="dark" text="light">
                                    <Card.Img 
                                    variant="top"
                                    crossOrigin="anonymous | use-credentials"
                                    src={m.ImagePath}
                                    />
                                    <Card.Body>
                                        <Card.Title>{m.Title}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        ))}
                        </CardGroup>
                    </Card>
                </Card.Body>
                <Card.Footer className="text-right">
                    <Button 
                        className="button-genre-view"
                        variant="secondary"
                        onClick={() => {
                            onBackClick();
                        }}
                        >
                    Back
                    </Button>
                </Card.Footer>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        user: state.user
    };
}

export default connect(mapStateToProps)(GenreView);