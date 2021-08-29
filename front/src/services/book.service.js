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

    getById(id) {
        return axios
         .get(API_URL + 'book/' + parseInt(id), { headers: AuthenticationHeaderService() })
         .then(response => {
             return response.data.data;
         });
    }

    create(title, author, pages, read) {
        return axios
         .post(API_URL + 'book', {
                title,
                author,
                pages,
                read
            },
            { headers: AuthenticationHeaderService() }
            ).then(response => {
             return response;
         });
    }

    edit(id, title, author, pages, read) {
        return axios
         .put(API_URL + 'book/' + id, {
             title,
             author,
             pages,
             read
         },
         { headers: AuthenticationHeaderService() }
         ).then(response => {
             return response;
         });
    }

    delete(id) {
        return axios
         .delete(API_URL + 'book/' + id, 
         { headers: AuthenticationHeaderService() }
         ).then(response => {
             return response
         });
    }
}

export default new BookService();