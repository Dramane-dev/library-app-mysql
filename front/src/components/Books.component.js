import React, { Component } from 'react';
import {
    Link 
  } from 'react-router-dom';

import AuthenticationService from '../services/authentication.service';
import BookService from '../services/book.service';

import '../css/books.css';
export default class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            books: []
        };
    }

    async componentDidMount() {
        const user = AuthenticationService.getCurrentUser();
        
        if (user) {
            this.setState({
                connected: true,
                books: await BookService.all()
            });
        }
    }

    addNewBookBtn() {
        window.location.href = '/book';
    }

    render() {
        const { connected, books } = this.state;
        
        for (let i = 0; i < books.length; i++) {
            console.log(books[i].title);
        }
        
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
                ) : books.length > 0 ? (
                    <h1>All Books</h1>
                ) : (
                    <div className="no-books">
                        <h1>You don't have a books in your library...</h1>
                        <p>Would you like to add a book ?</p>
                        <p 
                         className="add-new-book"
                         onClick={this.addNewBookBtn}
                         >
                            Add new book
                        </p>
                    </div>
                )}
            </>
        );
    }
}