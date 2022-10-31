import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ values, setValues ] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: ''
    });

    const validate = () => {
        let isReq = true;
        if(!username){
            setValues({...values, usernameErr: 'Username is required.'});
            isReq = false;
        } else if(username.length < 5){
            setValues({...values, usernameErr: 'Username must be at least 5 characters long'})
            isReq = false;
        }
        if(!password){
            setValues({...values, passwordErr: 'Password is required.'});
            isReq = false;
        } else if(password.length < 6){
            setValues({...values, passwordErr: 'Password must be at least 6 characters long.'})
            isReq = false;
        }
        if (!email){
            setValues({...values, emailErr: 'Email is required.'});
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({...values, emailErr: 'Email is invalid.'})
            isReq = false;
        }
        return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
            axios.post('https://the-cine-file.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('Registration successful, please login!');
                props.onRegistration(true)
                window.open("/", "_self");
            })
            .catch(response => {
                console.error(response);
                alert('unable to register');
            });
        }
    };

    const loginFlow = () => {
        props.onRegistration(true)
    }

return (
    <Container>
        <Row>
            <Col md={8}>
                <CardGroup>
                    <Card style={{ marginTop: 100, marginBottom: 50, width: '30rem' }}>
                        <Card.Body>
                            <Card.Title >Please Register</Card.Title>
                            <Form>
                                <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    placeholder="Enter a username" />
                                {values.usernameErr && <p>{values.usernameErr}</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        minLength="8"
                                        placeholder="Your password must be 8 or more characters"
                                        />
                                    {values.passwordErr && <p>{values.passwordErr}</p>}
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control 
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email address"
                                     />
                                {values.emailErr && <p>{values.emailErr}</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control 
                                    type="Birthday"
                                    value={birthday}
                                    onChange={e => setBirthday(e.target.value)}
                                    required />
                                </Form.Group>
                                
                                <div>
                                <Button 
                                    className="mt-1"
                                    variant="primary"
                                    type="submit" 
                                    onClick={handleSubmit}>
                                    Register
                                </Button>
                                </div>
                                <p></p>
                                Already registered? <br />
                                <Button 
                                    href={"/"}
                                    className="mt-1"
                                    variant="secondary"
                                    type="submit" 
                                    onClick={loginFlow}
                                    >
                                    Login
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

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    })
};