import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export function NavBar({ user }) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    };

    return (
        <Navbar 
        className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark"
        >
            <Container>
                <Navbar.Brand className="navbar-logo" as={Link} to="/">
                    Cine-File
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                    {isAuth() && (
                        <Nav.Link as={Link} to={`/users/${user}`}>
                            {user}
                        </Nav.Link>
                    )}
                        {isAuth() && (
                            <Button 
                            variant="link"
                            onClick={() => {
                                onLoggedOut();
                            }}
                            >
                            Logout
                            </Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link as={Link} to="/">
                            Login
                            </Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link as={Link} to="/register">
                                Register
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

//make a named function that returns an unordered list (style with bootstrap?)
//with link items (home, profile-view, signup and signout)


//create a method that returns a token from local storage; the else function
//should return false. Use this method to hide the signup page if the 
//token exists and to display home, profile and signout.


//create a method that signs the user out when the signout button is clicked.




//check that this looks like the illustrated example in the exercise
//THEN

//import your named function into main-view.jsx
//place navbar after the router in the main view so it appears on all views
//with the navbar now in place, in main-view.jsx, create the routes for the views
//in your navbar.
//check with illustrated example.

