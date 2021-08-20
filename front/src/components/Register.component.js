import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { isEmail } from 'validator';

import AuthenticationService from '../services/authentication.service';

import '../css/Register.css';

const required = value => {
    if (!value) {
        return (
            <div className="required">
                This field is required !
            </div>
        );
    }
};

const name = value => {
    if (value.toString().length < 3 || value === ' ') {
        return (
            <div className="required">
                The name should have 3 minimum letter and shouldn't be empty !
            </div>
        );
    }
}

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="required">
                This is invalid email !
            </div>
        );
    }
}

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
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            message: '',
            successful: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
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

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            successful: false
        });


        if (this.checkBtn.context._errors.length === 0) {
            AuthenticationService.register(
                this.state.name,
                this.state.email,
                this.state.password
            )
             .then(response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                })
             })
             .catch(err => {
                 const errMessage = 
                 (err.response && err.response.data && err.response.data.message) ||
                 err.message ||
                 err.toString();

                 this.setState({
                     message: errMessage,
                     successful: false
                 })
             });
        }
    }

    render() {
        return(
            <>
                <div id="form-title-container" className="form-title-container">
                    <h1 id="form-title">Register</h1>
                </div>

                <div className="form-container">
                    <img src="../../img/profile.png" alt="profile-img" />
                    <Form 
                     ref={f => {
                         this.form = f;
                     }}
                     className="form-register"
                     onSubmit={this.handleRegister}
                    >
                        <label htmlFor="title">Name</label>
                        <Input 
                          id="name"
                          type="text"
                          name="name"
                          placeholder="name"
                          value={this.state.name}
                          onChange={this.onChangeName}
                          validations={[required, name]}
                        />

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
                        />
                    </Form>
                </div>
            </>
        );
    }
} 