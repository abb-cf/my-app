import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return ( 
        // <div className="movie-card" onClick={() => onMovieClick(movie)}>{movie.Title}</div>;
            <Card className="movie-card">
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        // Genre: PropTypes.shape({
        //     Name: PropTypes.string.isRequired,
        //     Description: PropTypes.string.isRequired
        // }),
        // Director: PropTypes.shape({
        //     Name: PropTypes.string.isRequired,
        //     Description: PropTypes.string
        // })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};