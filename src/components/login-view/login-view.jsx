import React, { useState } from 'react';
import { Button, Col, Row, Container, Card, Form, CardGroup } from 'react-bootstrap';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //send a request to server for auth.
        //then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    return(
        <Container>
            <Row>
                <Col md={8}>
                    <CardGroup>
                        <Card style={{ marginTop: 100, marginBottom: 50, width: '30rem' }}>
                            <Card.Body>
                                <Card.Title>Please Login</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                        placeholder="Enter your username" />
                                    </Form.Group>
                    
                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        placeholer="Enter your password" />
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