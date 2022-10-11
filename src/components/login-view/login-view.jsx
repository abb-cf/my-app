import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Row, Container, Card, Form, CardGroup } from 'react-bootstrap';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    //Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username Required');
            isReq = false;
        } else if(username.length < 2){
            setUsernameErr('Username nust be 2 characters long');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        } else if(password.length < 6){
            setPasswordErr('Password must be 6 characters long');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
            //send a request to server for auth.
            axios.post('https://the-cine-file.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            //then call props.onLoggedIn(username)
            .then(response =>{
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
        }
    };

    // const handleRegister = (e) => {
    //     e.preventDefault();
        
    //     axios.post('https://the-cine-file.herokuapp.com/register', {
    //         Username: username,
    //         Password: password
    //     })
    //     .then(response => {
    //         const data = response.data;
    //         props.onRegistration(data);
    //     });
    // };

    return(
        <Container>
            <Row>
                <Col md={8}>
                    <CardGroup>
                        <Card style={{ marginTop: 100, marginBottom: 50, width: '30rem' }}>
                            <Card.Body>
                                <Card.Title>Please Login</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                        placeholder="Enter your username" />
                                        {/* code added here to display validation error */}
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>
                    
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        placeholer="Enter your password" />
                                        {/* code added here to display validation error */}
                                        {passwordErr && <p>{[passwordErr]}</p>}
                                    </Form.Group>

                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        onClick={handleSubmit}>
                                        Login
                                    </Button>
                                    <Button 
                                        variant="secondary" 
                                        type="submit">
                                        Register
                                    </Button>  
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}