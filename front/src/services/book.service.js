import axios from 'axios';
import AuthenticationHeaderService from './authentication-header.service';

const API_URL = 'http://localhost:3030/';

class BookService {
    all() {
        return axios
         .get(API_URL + 'Books', { headers: AuthenticationHeaderService() })
         .then(response => {
            return response.data;
         });
    }

}

export default new BookService();