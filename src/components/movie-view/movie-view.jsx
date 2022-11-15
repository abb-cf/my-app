import React from 'react';
// import PropTypes from 'prop-types';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";
import axios from 'axios';

export class MovieView extends React.Component {

    addMovieToFavorites(e) {
        const { movie } = this.props;
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        e.preventDefault();
        axios
            .post(
                `https://the-cine-file.herokuapp.com/users/${username}/Favorites/${movie._id}`,
                {username: localStorage.getItem("user") },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                console.log(response);
                alert("Movie added");
            })
            .catch((error) => console.error(error));
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={movie.ImagePath}
                                crossOrigin="anonymous"
                            >
                            </Card.Img>
                            <Card.Body
                                label="Description: "
                                src={movie.Description}>
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                            </Card.Body>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <Button variant="link">Director</Button>
                            </Link>
                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button variant="link">Genre</Button>
                            </Link>
                            <Button
                                variant="success"
                                onClick={(e) => this.addMovieToFavorites(e)}>
                                Add to favorites
                            </Button>
                            <Button
                                variant="link"
                                onClick={() => { onBackClick(); }}>
                                Back
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MovieView;