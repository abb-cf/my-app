import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
    
    constructor() {
        super();

        this.state = {
            movies: [],
            user: null
            // registered: false
        };
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://the-cine-file.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            //Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    // onRegistration(setted) {
    //     console.log(setted);
    //     this.setState({
    //         registered: setted
    //     });
    // }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    // onLoggedOut() {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //     this.setState({
    //         user: null
    //     });
    // }

    render() {
        // return(<div>Title</div>)
        
        let { movies } = this.state;
        let { user } = this.state;
        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route
                        exact path="/" render={() => {
                            if(!user) return
                            <Col>
                                <LoginView  
                                    onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies && movies.length === 0) {
                                return <div className='main-view'/>;
                            } 
                            return movies && movies.map(m=> 
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            )
                        }}
                    />
                    <Route
                        path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return (
                                <Col lg={8}>
                                <RegistrationView />
                                </Col>
                            );
                        }}
                    />
                    <Route 
                        exact
                        path="/movies/:movieId"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView 
                                        onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                <MovieView
                                movie={movies.find(m => m._id === match.params.movieId)}
                                onBackClick={() => history.goBack()}
                                />
                            </Col>
                            );
                        }}
                    />
                </Row>
            </Router>
        );
    }
}

export default MainView;