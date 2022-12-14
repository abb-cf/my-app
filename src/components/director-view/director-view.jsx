import React from 'react';
// import PropTypes from 'prop-types';
import { CardGroup, Button, Card, Col } from 'react-bootstrap';
import { connect } from 'react-redux';


import { Link } from 'react-router-dom';

import './director-view.scss'

export class DirectorView extends React.Component {
    render() {
        const { movies, director, onBackClick } = this.props;

        return (
            <Card bg="dark" text="light">
                <Card.Header className="text-center" as="h5">
                    {director.Director.Name}
                </Card.Header>
                <Card.Body className="director-text-area">
                    <Card bg="dark" border="dark" text="light">
                        <div className="movie-director-birth">
                            <span className="label">Born in</span>
                            <span className="value"> {director.Director.Birth}</span>
                        </div>
                        <div className="movie-director-death">
                            <span className="label">Died in</span>
                            <span className="value"> {director.Director.Death}</span>
                        </div>
                        <div className="movie-director-bio">
                        <span className="label">Bio: </span>
                        <span className="value"> {director.Director.Bio}</span>
                    </div>
                        <span className="label headline-director-mini-cards">
                            Selected movies by this director
                        </span>
                        <CardGroup className="card-group-director-mini-cards">
                        {movies.map((m) => (
                            <Col 
                                md={6}
                                lg={3}
                                key={m._id}
                                className="director-movie-card-mini"
                                >
                                <Link to={`/movies/${m._id}`}>
                                    <Card className="h-100" bg="dark" text="light">
                                        <Card.Img
                                        variant="top"
                                        crossOrigin="anonymous | use-credentials"
                                        src={m.ImagePath} />
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
                    className="button-director-view"
                    variant="secondary"
                    onClick={() => {
                        onBackClick();
                    }}>
                    Back    
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        user: state.user
    };
}

export default connect(mapStateToProps)(DirectorView);


