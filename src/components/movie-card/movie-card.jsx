import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import './movie-card.scss'

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return ( 
        <Card className="movie-card">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <div className='link-bottom'>  
                <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                </Link>
                </div>
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
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string
        })
    }).isRequired,
};

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        user: state.user
    };
}

export default connect(mapStateToProps)(MovieCard);