import axios from 'axios';

export default {
  login(user) {
    return axios.post('http://localhost:3000/auth/login', user);
  },
};
