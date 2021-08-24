import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { store } from 'react-notifications-component';
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

        const { email, password } = this.state;

        if (email !== '' || password !== '') {
            AuthenticationService.login(
                email,
                password
            ).then(response => {
                this.setState({
                    successful: true,
                    message: response.data,
                    data: response.data
                });
                if (this.state.message) {
                    store.addNotification({
                        title: 'You are connected successfuly ✅',
                        message: ' ',
                        type: 'success',
                        insert: 'top',
                        container: 'top-full',
                        animationIn: ['animate__animated', 'animate__flipInX'],
                        animationOut: ['animate__animated', 'animate__flipOutX'],
                        dismiss: {
                            duration: 2000
                        }
                    });
                }
            }).catch(err => {
                this.setState({
                    successful: false,
                    message: err
                });
                store.addNotification({
                    title: 'Please verify your email or your password ...',
                    message: ' ',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-full',
                    animationIn: ['animate__animated', 'animate__bounceIn'],
                    animationOut: ['animate__animated', 'animate__bounceOut'],
                    dismiss: {
                        duration: 3000
                    }
                });
            });
        }
    }

    cancel() {
        return window.location.href = '/';
    }

    render() {
        const { successful } = this.state;

        if (successful) {
            setTimeout(() => {
                window.location.href = '/books'
                return (
                    <Books />
                );
            }, 1000);
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