import axios from 'axios';

const API_URL = 'http://localhost:3030/';

class BookService {
    all() {
        return axios
         .get(API_URL + 'Books')
         .then(response => {
            return response.data;
         });
    }

}

export default new BookService();