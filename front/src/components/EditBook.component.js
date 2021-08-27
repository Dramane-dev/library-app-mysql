import React, { Component } from 'react';


import BookService from '../services/book.service';

export default class EditBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            author: '',
            pages: '',
            read: ''
        };
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <h1>My Edit Form Component !</h1>
        );
    }
}