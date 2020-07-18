import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Model } from 'mongoose';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import LoginForm from './authentication/LoginForm';
import SignupForm from './authentication/SignupForm';



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalLoginOpen: false,
            isModalSignupOpen: false,
        };
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    toggleLoginModal () {
        this.setState({
            isModalLoginOpen: !this.state.isModalLoginOpen
        });
    }
    toggleSignupModal () {
        this.setState({
            isModalSignupOpen: !this.state.isModalSignupOpen
        });
    }

    handleLogin(event) {
        this.toggleLoginModal();
        alert("Welcome!");
        event.preventDefault();
    }

    handleSignup(event) {
        console.log(this.props);
        if (this.props.signupPassword !== this.state.signupPwConfirm) {
            alert("Passwords did not match. Try again");
        }
        else {
            this.toggleSignupModal();
        }
        event.preventDefault();
    }

    renderLogin() {
        return (
            <Modal show={this.state.isModalLoginOpen} onHide={this.toggleLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ml-5 mr-5">
                    <LoginForm handleLogin={this.handleLogin} />
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
        );
    }

    renderLogout() {

    }

    renderSignup() {
        return (
            <Modal show={this.state.isModalSignupOpen} onHide={this.toggleSignupModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ml-5 mr-5">
                    <SignupForm handleSignup={this.handleSignup} />
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
                            Signup With Google
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Bee-Hotel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/accommodations">Accommodations</Nav.Link>
                    <Nav.Link href="/restaurant">Restaurant</Nav.Link>
                    <Nav.Link href="/events">Meetings & Events</Nav.Link>
                    <NavDropdown title="Services" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/services">Fitness Gym Club</NavDropdown.Item>
                        <NavDropdown.Item href="/services">Swimming Pool</NavDropdown.Item>
                        <NavDropdown.Item href="/services">Sauna Rooms</NavDropdown.Item>
                        <NavDropdown.Item href="/services">Thai Massage</NavDropdown.Item>
                        <NavDropdown.Item href="/services">Tours</NavDropdown.Item>
                        <NavDropdown.Item href="/services">Airport Transfers</NavDropdown.Item>
                        <NavDropdown.Item href="/services">Resort Map</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/auth/google">Login With Google</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Button variant="primary" onClick={this.toggleLoginModal}>
                        Login
                    </Button>
                    <Button variant="primary" onClick={this.toggleSignupModal}>
                        Register
                    </Button>
                    {this.renderLogin()}
                    {this.renderSignup()}
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;