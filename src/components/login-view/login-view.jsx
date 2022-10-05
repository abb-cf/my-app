import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Login
            </Button>
            <Button variant="secondary" type="submit">Register</Button>
            
        </Form>

        // <form>
        //     <label>
        //         Username:
        //         <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        //     </label>
        //     <label>
        //         Password:
        //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        //     </label>
        //     <button type="submit" onClick={handleSubmit}>Submit</button>
        // </form>
    );
}


// export class LoginView extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             username: '',
//             password: ''
//         };

//         this.onUsernameChange = this.onUsernameChange.bind(this);
//         this.onPasswordChange = this.onPasswordChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     onUnsernameChange(event) {
//         this.setState({
//             username: event.target.value
//         });
//     }

//     onPasswordChange(event) {
//         this.setState({
//             password: event.target.value
//         });
//     }

//     handleSubmit() {
//         const { username, password } = this.state;
//         console.log(username, password);
//         //Send a request to server for authentication
//         //then call this.props.onLoggedIn(username)
//         //this.props.onLoggedIn(username);
//     }

//     render() {
//         return (
//             <form>
//                 <label>
//                     Username:
//                     <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
//                 </label>
//                 <label>
//                     Password:
//                     <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
//                 </label>
//                 <button type="button" onClick={this.handleSubmit}>Submit</button>
//             </form>
//         );
//     }
// }