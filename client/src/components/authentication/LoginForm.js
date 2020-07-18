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

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleLogin = this.props.handleLogin.bind(this);
    }


    render () {
        console.log(this.props);
        return (
            <Form onSubmit={this.handleLogin}>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <span className="fa fa-user fa-lg"></span>   
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Username" required
                            onChange={e => this.setState({username: e.target.value})}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your username
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
                        <Form.Control type="password" placeholder="Password" required
                            onChange={e => this.setState({password: e.target.value})} />
                        <Form.Control.Feedback type="invalid">
                            Please enter your password
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="text-center">
                    <Button type="submit" className="text-center btn-login" onClick={() =>
                        this.props.dispatch({ type: "LOGIN_FORM_SUBMIT", payload: {username: this.state.username, password: this.state.password}})    
                    }>
                        Login
                    </Button>
                </Form.Group>
            </Form>         
        );
    };
}

const mapStateToProps = state => ({
    loginForm: state.loginForm
});

export default connect(mapStateToProps)(LoginForm);