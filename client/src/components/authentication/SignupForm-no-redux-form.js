import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmation: '',
            email: '',
            firstname: '',
            lastname: ''
        }
        this.handleSignup = this.props.handleSignup.bind(this);
    }
    render() {
        return (
            <Form onSubmit={this.handleSignup}>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <span className="fa fa-user fa-lg"></span>   
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Username" name="username" onChange={e => this.setState({username: e.target.value})} required />
                        <Form.Control.Feedback type="invalid">
                            Please enter a username
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
                        <Form.Control type="password" placeholder="Password" name="password" onChange={e => this.setState({password: e.target.value})} required />
                        <Form.Control.Feedback type="invalid">
                            Please enter your password
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
                        <Form.Control type="password" placeholder="Confirmation" name="confirmation" onChange={e => this.setState({confirmation: e.target.value})} required />
                        <Form.Control.Feedback type="invalid">
                            Repeat your password
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <span className="fa fa-user fa-lg"></span>   
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Email" name="email" onChange={e => this.setState({email: e.target.value})} required />
                        <Form.Control.Feedback type="invalid">
                            Please enter an email
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <span className="fa fa-user fa-lg"></span>   
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="First name" name="firstname" onChange={e => this.setState({firstname: e.target.value})} required />
                        <Form.Control.Feedback type="invalid">
                            Please enter your first name
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <span className="fa fa-user fa-lg"></span>   
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Last name" name="lastname" onChange={e => this.setState({lastname: e.target.value})} required />
                        <Form.Control.Feedback type="invalid">
                            Please enter your last name
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="text-center">
                    <Button type="submit" className="text-center btn-login">
                        Register
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

function validate(state) {
    const errors = {};
    state.forEach(({ name }) => {
        if (!state[name]) {
            errors[name] = `You must provide a ${name}`;
        }
        if (name === 'email') {
            const validateEmail = validateEmail(name);
            if (validateEmail) {
                errors[name] = validateEmail;
            }
        }
    });
    if (state.password !== state.confirmation) {
        errors['confirmation'] = 'Passwords did not match. Try again';
    }
    return errors;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (re.test(email) === false) {
        return 'Invalid email';
    }
    return;
};

const mapStateToProps = state => ({
    signupForm: state.signupForm
});

export default connect(mapStateToProps)(SignupForm);