import axios from 'axios';
import { mapGetters } from 'vuex';

const token = {
  ...mapGetters(['getToken']),
};

axios.defaults.baseURL = 'https://192.168.1.53:3000'; // Update api address
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

  postTestResult(data) {
    return axios.post('/user/test-result', data);
  },
};
