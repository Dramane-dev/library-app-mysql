import axios from 'axios';
import AuthenticationHeaderService from './authentication-header.service';

const API_URL = 'http://localhost:3030/';

class BookService {
    all() {
        return axios
         .get(API_URL + 'books', { headers: AuthenticationHeaderService() })
         .then(response => {
            return response.data.data;
         });
    }

    create(book) {
        return axios
         .post(
            API_URL + 'book', 
            { headers: AuthenticationHeaderService() },
            { contentType: 'application/json' },
            book
         )
         .then(response => {
             console.log(response.data);
         })
    }

    edit() {

    }
}

export default new BookService();