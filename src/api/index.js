import axios from 'axios';
import { mapGetters } from 'vuex';

const token = {
  ...mapGetters(['getToken']),
};

axios.defaults.baseURL = process.env.VUE_APP_API_ADDR;
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

  postTestComplete(data) {
    return axios.post('/user/tests-completed', data);
  },

  getTestResults() {
    return axios.get('/admin/test-results');
  },
};
