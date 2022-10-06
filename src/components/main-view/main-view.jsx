import { times } from 'lodash';
import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {
    
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount(){
        axios.get('https://the-cine-file.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onRegistration(register) {
        this.setState({
            register
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

        /* If there is no user, the LoginView is rendered. If there is a user
        logged in, the user details are *passed as a prop to the LoginView */
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? (
                    <Row className="justify-content-md-center">
                        <Col md={6}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                        </Col>
                    </Row>
                    )
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                    ))
                    }    
            </div>
        );
    }
}

export default MainView;