import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavBar } from '../navbar/navbar';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import { setMovies, setUser, setFavorite, deleteFavorite, } from '../../actions/actions.js';
import MoviesList from '../movies-list/movies-list';

class MainView extends React.Component {
    
    constructor() {
        super();
        this.state = {
            user: null,
            favoriteMovies: []
            // registered: false
        };
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getMovies(accessToken)
            this.getMovies(accessToken);
        }
    }

    getUser(token) {
        const user = localStorage.getItem('user');
        axios.get(`https://the-cine-file.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            this.props.setUser(response.data);
          })
          .catch(error => {
            console.log(error.response);
          })
    }

    getMovies(token) {
        axios.get('https://the-cine-file.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            //Assign the result to the state
            this.props.setMovies(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }


    render() {
        // return(<div>Title</div>)
        
        let { movies } = this.props;
        let { user } = this.state;

        return (
            <Router>
                <NavBar user={user} />
                <Row className="main-view justify-content-md-center">
                    <Route
                        exact path="/" render={() => {
                            if(!user) return (
                            <Col>
                                <LoginView  
                                    onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            );
                            if (movies && movies.length === 0) {
                                return ( <div className='main-view'/> );
                            } 
                            return (<MoviesList movies={movies}/>)
                        }}
                    />
                    <Route
                        path="/register" render={() => {
                            if (user) return ( <Redirect to="/" /> )
                            return (
                                <Col lg={8} md={8}>
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
                                <MovieView user={user}
                                movie={movies.find(m => m._id === match.params.movieId)}
                                onBackClick={() => history.goBack()}
                                />
                            </Col>
                            );
                        }}
                    />
                    <Route 
                        path="/genres/:name"
                        render={({ match, history }) => {
                            if (!user)
                            return (
                                <Col xs={12}>
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                </Col>
                            );
                            if (movies.length === 0) return (<div className="main-view" />);
                            return (
                                <Col md={8}>
                                    <GenreView 
                                    genre={movies.find(m=> m.Genre.Name === match.params.name )}
                                    movies={movies.filter(m=> m.Genre.Name === match.params.name )}
                                    onBackClick ={() => history.goBack()} 
                                    />
                                </Col>
                            );        
                        }}
                    />
                    <Route 
                        path="/directors/:name"
                        render={({ match, history }) => {
                            if (movies.length === 0) return (<div className="main-view" />);
                            if (!user) return (
                                <Col xs={12}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            )
                            return (
                                <Col md={8}>
                                    <DirectorView 
                                    director={movies.find(m=> m.Director.Name === match.params.name)}
                                    movies={movies.filter(m=> m.Director.Name === match.params.name )} 
                                    onBackClick={() => history.goBack()} 
                                    />
                                </Col>
                            );        
                        }}
                    />
                    <Route 
                    path={`/users/:username`} 
                        render={({history, match}) => {
                        if (!user) { return <Redirect to="/" /> }
                        if (movies.length === 0) return (<div className="main-view" />);
                        return (
                        <Col>
                            <ProfileView 
                                history={history} 
                                movies={movies} 
                                handleDeleteFavorite={this.handleDeleteFavorite}
                                user={user} />
                                
                        </Col>
                        );
                    }} />
                </Row>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { 
        movies: state.movies,
        user: state.user
    }
}

export default connect(mapStateToProps, { setMovies, setUser, setFavorite, deleteFavorite } )(MainView);