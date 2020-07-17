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
            isModalLoginOpen: false,
        };
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    toggleLoginModal () {
        this.setState({
            isModalLoginOpen: !this.state.isModalLoginOpen
        });
    }

    handleLogin(event) {
        this.toggleLoginModal();
        alert("Welcome!");
        event.preventDefault();
    }
    render() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        return (
            <Nav className="ml-auto">
                <Button variant="primary" onClick={this.toggleLoginModal}>
                    Login
                </Button>
                <Modal show={this.state.isModalLoginOpen} onHide={this.toggleLoginModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ml-5 mr-5">
                        <Form onSubmit={this.handleLogin}>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <span className="fa fa-user fa-lg"></span>   
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} required />
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
                                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your password
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="text-center">
                                <Button type="submit" className="text-center btn-login" onClick={() =>
                                    this.props.dispatch({ type: "LOGIN_FORM_SUBMIT", payload: {username, password}})    
                                }>
                                    Login
                                </Button>
                            </Form.Group>
                        </Form>
                        <div className="row m-0 p-0">
                            <div className="col-4">
                                <hr />
                            </div>
                            <div className="col-4 text-center">
                                <p>Or</p>
                            </div>
                            <div className="col-4">
                                <hr />
                            </div>
                        </div>
                        <div className="text-center">
                            <Button href="/auth/google" className="text-center btn-register">
                                Login With Google
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </Nav>
        );
    }
}

const mapStateToProps = state => ({
    loginForm: state.loginForm
});

export default connect(mapStateToProps)(LoginForm);