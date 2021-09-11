import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { store } from 'react-notifications-component';

import BookService from '../services/book.service';

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

        this.getBookById = this.getBookById.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeRead = this.onChangeRead.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

        this.state = {
            id: null,
            currentBook: {
                title: '',
                author: '',
                pages: null,
                bookRead: false
            },
            message: ''
        };
    }

    componentDidMount() {
        this.setState({
            id: this.props.match.params.id
        });

        this.getBookById(this.props.match.params.id);
    }

    getBookById(id) {
        BookService.getById(parseInt(id))
         .then(response => {
             this.setState({
                 currentBook: response
             })
         })
         .catch(err => {
            this.setState({
                message: err.message
            })
         });
    }

    onChangeTitle(e) {
        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                title: e.target.value
            }
        }));
    }

    onChangeAuthor(e) {
        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                author: e.target.value
            }
        }));
    }

    onChangePages(e) {
        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                pages: e.target.value
            }
        }));
    }

    onChangeRead(e) {
        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                bookRead: e.target.checked
            }
        }));
    }

    handleEdit(e) {
        e.preventDefault();

        if (
            this.state.currentBook.title !== '' &&
            this.state.currentBook.author !== '' &&
            this.state.currentBook.pages !== null &&
            this.state.currentBook.bookRead !== null
        ) {
            BookService.edit(
                this.state.id,
                this.state.currentBook
            )
             .then(response => {
                if (response.data.message.includes('successfuly')) {
                    store.addNotification({
                        title: 'You\'re book modified successfuly ✅',
                        message: ' ',
                        type: 'success',
                        insert: 'top',
                        container: 'top-full',
                        animationIn: ['animate__animated', 'animate__jackInTheBox'],
                        animationOut: ['animate__animated', 'animate__jackInTheBox'],
                        dismiss: {
                            duration: 2000
                        }
                    });
                 }
             })
             .catch(err => {
                 this.setState({
                     message: err.message
                 });
             });
        }
    }

    cancel() {
        window.location.href = '/books'
    }

    render() {
        const { currentBook } = this.state;

        return (
            <>
               <div className="form-title-container">
                   <h3>Edit a book</h3>
               </div>
               <div className="form-container">
                   <Form
                     className="form-book"
                     onSubmit={ this.handleEdit }
                    >
                       <label htmlFor="title">Title</label>
                       <Input 
                         type="text"
                         name="title"
                         placeholder="Title of book"
                         value={ currentBook.title }
                         onChange={ this.onChangeTitle }
                         validations={[ required ]}
                       />
    
                       <label htmlFor="author">Author</label>
                       <Input 
                         type="text"
                         name="author"
                         placeholder="Author"
                         value={ currentBook.author }
                         onChange={ this.onChangeAuthor }
                         validations={[ required ]}
                       />
    
                       <label htmlFor="pages">Pages</label>
                       <Input 
                         type="number"
                         name="pages"
                         placeholder="Number of pages"
                         value={ currentBook.pages }
                         onChange={ this.onChangePages }
                         validations={[ required ]}
                       />
    
                       <label htmlFor="read">Have you read it in entire ?</label>
                       <Input 
                         type="checkbox"
                         name="read"
                         checked={ currentBook.bookRead === '0' ? false : true }
                         onChange={ this.onChangeRead }
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
                         onClick={ this.cancel }
                       />
                   </Form>
               </div>
           </>
        );
    }
}