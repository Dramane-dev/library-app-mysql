import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import { isEmail } from 'validator';

import Books from './Books.component';

import AuthenticationService from '../services/authentication.service';

import '../css/form.css';

const required = value => {
    if (!value) {
        return (
            <div className="required">
                This field is required !
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="required">
                This is invalid email !
            </div>
        );
    }
};

const password = value => {
    if (value.toString().length < 3 || value === ' ') {
        return (
            <div className="required">
                The password should have 3 minimum letter and shouldn't be empty !
            </div>
        );
    }
}


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.cancel = this.cancel.bind(this);

        this.state = {
            email: '',
            password: '',
            message: '',
            successful: false,
            data: ''
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        const { email, password, message, successful } = this.state;

        if (email !== '' || password !== '') {
            AuthenticationService.login(
                email,
                password
            ).then(response => {
                this.setState({
                    successful: true,
                    message: response.data.message,
                    data: response.data
                });
            }).catch(err => {
                this.setState({
                    successful: false,
                    message: err
                });
            });
        }
    }

    cancel() {
        return window.location.href = '/';
    }

    render() {
        const { message, successful, data } = this.state;

        if (successful) {
            console.log(message);

            window.location.href = '/books'
            return (
                <Books />
            );
        } else {
            if (message === 404) {
                return (
                    <div id="form-title-container" className="form-title-container">
                        <h1 id="form-title">Login error</h1>
                        <a href="/signin">Please check your email or password.</a>
                    </div>
                );
            }
        }

        return (
            <>
                <div id="form-title-container" className="form-title-container">
                    <h1 id="form-title">Login</h1>
                </div>

                <div className="form-container">
                    <Form
                      ref={f => {
                        this.form = f
                      }}
                      className="form-login"
                      onSubmit={this.handleLogin}
                    >
                        <label htmlFor="email">Email</label>
                        <Input 
                        type="text"
                        name="email"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                        />

                        <label htmlFor="pages">Password</label>
                        <Input 
                        type="text"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, password]}
                        />

                        <Input 
                        className="submit"
                        name="submit"
                        value="Submit"
                        type="Submit"
                        />

                        <Input 
                        className="cancel"
                        name="cancel"
                        value="Cancel"
                        type="button"
                        onClick={this.cancel}
                        />
                    </Form>
                </div>
            </>
        );
    }

}