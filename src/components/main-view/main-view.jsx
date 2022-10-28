import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
    
    constructor() {
        super();

        this.state = {
            movies: [],
            user: null,
            registered: false
        };
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
    
    onRegistration(setted) {
        console.log(setted);
        this.setState({
            registered: setted
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

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        let { movies } = this.props;
        let { user } = this.state;
        return (
            <Router>
                <Container>
                    <Row>
                        <Routes>
                        <Route
                            exact 
                            path="/"
                            render={() => {
                                if(!user)
                                return (
                                    <Col>
                                    <LoginView
                                    // movies={movies}
                                    onLoggedIn={(user) => this.onLoggedIn(user)} />  
                                    </Col>
                                );
                                if (movies.length === 0) return <div className='main-view'/>;
                                
                                return (movies.map(m=> 
                                    <Col md={3} key={m._id}>
                                        <MovieCard movie={m} />
                                    </Col>
                                ))
                            }}
                        />
                        <Route
                            exact
                            path="/register"
                            render={( { history }) => {
                                if (user) return <Navigate to="/" />;
                                return (
                                    <Col lg={8}>
                                    <RegistrationView 
                                        onSuccessfulRegistartion={() => history.push("/")} />
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
                                            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                        </Col>
                                    );
                                if (movies.length === 0) return <div className="main-view" />;
                                return (
                                    <Col md={8}>
                                    <MovieView
                                    movie={movies.find((m) => m._id === match.params.movieId)}
                                    onBackClick={() => history.goBack()}
                                    />
                                </Col>
                                );
                            }}
                        />
                        </Routes>
                    </Row>
                </Container>
            </Router>
        );
    }
}

        // const { movies, user, registered } = this.state;

        // if (!user) return( 
        // <Row>
        //     <Col>
        //         <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        //     </Col>    
        // </Row>
        // )

        // if (!registered) return(
        //     <Row>
        //         <Col>
        //             <RegistrationView onRegistration={(registered) => this.onRegistration(registered)} />
        //         </Col>
        //     </Row>
        // )
            
        // /* If there is no user, the LoginView is rendered. If there is a user
        // logged in, the user details are *passed as a prop to the LoginView */

        // // Before the movies have been loaded
        // if (movies.length === 0) return (<div className="main-view" />);

        // <button onClick={() => {this.onLoggedOut()}}>Logout</button>

        // return (
        //     <Router>
        //         <Row className="main-view justify-content-md-center">
        //             <Routes>
        //             <Route exact path="/" render ={() => {
        //                 return (movies.map(m => (
        //                     <Col md={3} key={m._id}>
        //                         <MovieCard movie={m} />
        //                     </Col>
        //                 )))
        //             }} />

        //             <Route path="/movies/:movieId" render= {({ match, history }) => {
        //                 return (<Col md={8}>
        //                     <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
        //                     onBackClick={() => history.goBack()} />
        //                 </Col>
        //             )}} />
        //             </Routes>
                    
        //             {/* DirectorView */}
        //             {/* <Routes>
        //                 <Route path="/directors/:name" render={({ match, history }) => {
        //                     if (movies.length === 0) return <div />;
        //                     return( 
        //                         <Col md={8}>
        //                             <DirectorView director={movies.find(m=> m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
        //                         </Col>)
        //                 }} />
        //             </Routes> */}

        //             {/* GenreView */}
        //             {/* <Routes>
        //                 <Route path="/genres/:name" render={({ match, history}) => {
        //                     if (movies.length === 0) return <div />;
        //                     return(
        //                         <Col md={8}>
        //                             <GenreView genre={movies.find(m=> m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
        //                         </Col>
        //                     )
        //                 }}/>
        //             </Routes> */}
        //         </Row>
        //     </Router>
        // );
    // }


export default MainView;