import React, { Component, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';

const LoginForm = props => {
    console.log(props.loginForm.errors);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Form onSubmit={props.handleLogin}>
            <Form.Group>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <span className="fa fa-user fa-lg"></span>   
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Username" 
                        onChange={e => setUsername(e.target.value)}
                        // isInvalid={props.loginForm.errors.username.length > 0}
                        // isValid={props.loginForm.values.username && props.loginForm.errors.username.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {/* {props.loginForm.errors.username} */}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <span className="fa fa-key fa-lg"></span>   
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        Please enter your password
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group className="text-center">
                <Button type="submit" className="text-center btn-login" onClick={() =>
                    props.dispatch({ type: "LOGIN_FORM_SUBMIT", payload: {username, password}})    
                }>
                    Login
                </Button>
            </Form.Group>
        </Form>         
    );
}

const mapStateToProps = state => ({
    loginForm: state.loginForm
});

export default connect(mapStateToProps)(LoginForm);