import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { store } from 'react-notifications-component';

import BookService from '../services/book.service';

import '../css/form.css';

const required = value => {
    if (!value) {
        return (
            <div className="required">
                This field is required !
            </div>
        );
    }
}

export default class EditBook extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangePages = this.onChangePages.bind(this);
        this.onChangeRead = this.onChangeRead.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            title: '',
            author: '',
            pages: '',
            read: false,
            successful: false,
            message: ''
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onChangePages(e) {
        this.setState({
            pages: e.target.value
        });
    }

    onChangeRead(e) {
        this.setState({
            read: e.target.checked
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (
            this.state.title !== '' &&
            this.state.author !== '' &&
            this.state.pages !== '' &&
            this.state.read !== ''
        ) {
            BookService.create(
                this.state.title,
                this.state.author,
                this.state.pages,
                this.state.read
            ).then(response => {
                 console.log(response);
                 this.setState({
                    successful: true,
                    message: response.data.message
                 });

                 if (this.state.message.includes('successfuly')) {
                    store.addNotification({
                        title: 'You\'re book added successfuly ✅',
                        message: ' ',
                        type: 'success',
                        insert: 'top',
                        container: 'top-full',
                        animationIn: ['animate__animated', 'animate__jackInTheBox'],
                        animationOut: ['animate__animated', 'animate__jackInTheBox'],
                        dismiss: {
                            duration: 2000
                        }
                    })
                 }

                 setTimeout(() => {
                    window.location.href = '/books';
                 }, 1500);
             })
             .catch(err => {
                 this.setState({
                     successful: false,
                     message: err.response.status
                 });
                
                 if (this.state.message === 403) {
                    store.addNotification({
                        title: `Error ${ this.state.message } Not token provided ...`,
                        message: ' ',
                        type: 'danger',
                        insert: 'top',
                        container: 'top-full',
                        animationIn: ['animate__animated', 'animate__jackInTheBox'],
                        animationOut: ['animate__animated', 'animate__jackInTheBox'],
                        dismiss: {
                            duration: 2000
                        }
                    });
                 }

                 setTimeout(() => {
                    window.location.href = '/books';
                 }, 1500);
             });
        }
    }

    cancel() {
        window.location.href = '/books'
    }

    render() {
        return (
            <>
                <div className="form-title-container">
                    <h3>Add a new book</h3>
                </div>

                <div className="form-container">
                    <Form
                     className="form-book"
                     onSubmit={this.handleSubmit}
                    >
                        <label htmlFor="title">Title</label>
                        <Input 
                         type="text"
                         name="title"
                         placeholder="Title of book"
                         value={this.state.title}
                         onChange={this.onChangeTitle}
                         validations={[required]}
                        />

                        <label htmlFor="author">Author</label>
                        <Input 
                         type="text"
                         name="author"
                         placeholder="Author"
                         value={this.state.author}
                         onChange={this.onChangeAuthor}
                         validations={[required]}
                        />

                        <label htmlFor="pages">Pages</label>
                        <Input 
                         type="text"
                         name="pages"
                         placeholder="Number of pages"
                         value={this.state.pages}
                         onChange={this.onChangePages}
                         validations={[required]}
                        />

                        <label htmlFor="read">Have you read it in entire ?</label>
                        <Input 
                         type="checkbox"
                         name="read"
                         value={this.state.read}
                         onChange={this.onChangeRead}
                        />

                        <Input
                        className="submit" 
                         type="submit"
                         name="submit"
                         value="Submit"
                        />

                        <Input 
                          className="cancel"
                          type="button"
                          name="cancel"
                          value="Cancel"
                          onClick={this.cancel}
                        />
                    </Form>
                </div>
            </>
        );
    }
}







