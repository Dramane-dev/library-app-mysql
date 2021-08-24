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

    editBook() {

    }

    render() {
        const { connected, books } = this.state;

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
                    <div id="books-container" className="books-container">
                        {
                            books.map((book, index) => (
                                <div key={ index } className="book-card">
                                    <div className="btns-container">
                                        <div className="delete-book">
                                            <span>X</span>
                                        </div>
                                        <div 
                                         className="edit-book"
                                         >
                                            <span className="material-icons">edit</span>
                                        </div>
                                    </div>
                                    <h1>Title</h1>
                                    <p>{ book.title }</p>
                                    <h1>Author</h1>
                                    <p>{ book.author }</p>
                                    <h1>Pages</h1>
                                    <p>{ book.pages }</p>
                                    <h1>Read</h1>
                                    <p>{ book.bookRead.toString() }</p>
                                </div>
                            ))
                        }
                    </div>
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