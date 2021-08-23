import axios from 'axios';
import AuthenticationHeaderService from './authentication-header.service';

const API_URL = 'http://localhost:3030/';

class BookService {
    all() {
        return axios
         .get(API_URL + 'books', { headers: AuthenticationHeaderService() })
         .then(response => {
             //console.log(response.data.data);
            return response.data.data;
         });
    }

}

export default new BookService();