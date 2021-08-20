import axios from 'axios';

const API_URL = 'http://localhost:3030/api/auth/';

class AuthenticationService {
    login(email, password) {
        return axios
         .post(API_URL + 'signin', {
             email,
             password
         })
         .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
         })
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(name, email, password) {
        return axios
         .post(API_URL + 'signup', {
             name,
             email,
             password
         })
         .then(response => {
             console.log(response);
         })
         .catch(err => {
             console.log(err);
         });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthenticationService();