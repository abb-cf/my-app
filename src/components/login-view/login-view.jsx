import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Col, Row, Container, Card, Form, CardGroup } from 'react-bootstrap';

import './login-view.scss';

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
            .then((response) =>{
                console.log(response);
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch((e) => {
                console.log('no such user');
            });
        }
    };

    return(
        <Container className='registration' sm={4} md={6} lg={8} xl={8}>
            <Row>
                <Col xs={6} sm={6} md={8}>
                    <CardGroup>
                        <Card style={{ marginTop: 100, marginBottom: 50, width: '30rem' }}>
                            <Card.Body>
                                <Card.Title className='text-center mb-4'>Please Login</Card.Title>
                                <Form>
                                    <Form.Group className='mb-3'>
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
                    
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control 
                                        type="password" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        placeholer="Enter your password" />
                                        {/* code added here to display validation error */}
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>

                                    <div className='d-grip gap-2'>
                                    <Button 
                                        className='d-flex justify-content-center'
                                        variant="primary" 
                                        type="submit" 
                                        onClick={handleSubmit}>
                                        Login
                                    </Button>
                                    </div>
                                    <p></p>
                                    <p className='mt-5 text-center'>
                                    Dont have an account? <br />
                                    <Button 
                                        className="mt-2 d-flex justify-content-center"
                                        href={"/register"}
                                        variant="primary" 
                                        type="submit">
                                        Register
                                    </Button>  
                                    </p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
}
