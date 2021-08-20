import React, { Component } from 'react';
import {
    Link 
  } from 'react-router-dom';

import AuthenticationService from '../services/authentication.service';
import BookService from '../services/book.service';

export default class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            books: []
        };
    }

    componentDidMount() {
        const user = AuthenticationService.getCurrentUser();
        
        if (user) {
            this.setState({
                connected: true,
                books: BookService.all()
            });
        }

        console.log(this.state.books);
    }

    render() {
        const { connected } = this.state;

        return(
            <>
                {!connected ? (
                    <div id="not-logged" className="not-logged">
                    <p>Could you loggin</p>
                    <p>To have an access into the Library App</p>
                    <p>
                        <Link to={"/signin"}>
                        <span id="signin" className="signin">Sign In</span>
                        </Link>
                        or
                        <Link to={"/signup"}>
                        <span id="signup" className="signup">Sign Up</span>  
                        </Link>
                    </p>
                    </div>
                ) : (
                    <h1>All Books</h1>
                )}
            </>
        );
    }
}