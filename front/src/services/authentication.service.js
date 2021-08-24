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
            return response;
         }, error => {
             return Promise.reject(error.response.status);
         })
    }

    logout() {
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    register(name, email, password) {
        return axios
         .post(API_URL + 'signup', {
             name,
             email,
             password
         })
         .then(response => {
             return response;
         }, error => {
             return Promise.reject(error.response);
         })
         .catch(err => {
            return err;
         })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthenticationService();