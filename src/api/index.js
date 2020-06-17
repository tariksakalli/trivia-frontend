import axios from 'axios';
import { mapGetters } from 'vuex';

const token = {
  ...mapGetters(['getToken']),
};

axios.defaults.baseURL = 'http://localhost:3000';
axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default {
  login(user) {
    return axios.post('/auth/login', user);
  },

  submitSurvey(data) {
    return axios.post('/user/survey', data);
  },

  getStudents() {
    return axios.get('/admin/students');
  },
};
