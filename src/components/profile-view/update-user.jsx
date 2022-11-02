import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import './profile-view.scss';

function UpdateUser( {handleSubmit, handleUpdate, user }) {
    const [userName, setUserName] = useState(user.Username);
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState(user.Email);

    return (
        <>
            <h2>Want to change your info?</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={userName}
                        name="Username"
                        required
                        onChange={(e) => setUserName(e.target.value)} 
                        />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="password"
                        value={newPassword}
                        required
                        minLength={"8"}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Password must be 8 more more characters."
                        />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email address"
                    />
                    </Form.Group>
                    <Button
                    className="mt-2"
                    variant="info"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit({
                        userName,
                        newPassword,
                        email,
                        });
                    }}
                    >
                    Submit
                    </Button>
                </Form>
                </>
            );
        }

export default UpdateUser;
