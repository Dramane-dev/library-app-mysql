import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import BookForm from './BookForm.component';

import BookService from '../services/book.service';

function EditBook() {
    const { id } = useParams();
    const [book, setBook] = useState([]);

    window.onload = async () => {
        await BookService.getById(parseInt(id)).then(response => {
            setBook(response);
        }).catch(err => console.log(err));
    }

    const edit = book ? true : false;

    return (
        <>  
            <BookForm id={ id } book={ book } edit={ edit } />
        </>
    );
}

export default EditBook;