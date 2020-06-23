/* eslint-disable no-shadow */
import api from '@/api';

const state = {
  students: [],
  testResults: [],
};

const getters = {
  getStudentsList(state) {
    return state.students;
  },
  getTestResults(state) {
    return state.testResults;
  },
};

const actions = {
  getStudents({ commit }) {
    return api.getStudents().then(({ data }) => {
      commit('SET_STUDENT_LIST', data);
    });
  },
  getTestResults({ commit }) {
    return api.getTestResults().then(({ data }) => {
      commit('SET_TEST_RESULTS', data);
    });
  },
};

const mutations = {
  SET_STUDENT_LIST(state, studentList) {
    state.students = studentList;
  },
  SET_TEST_RESULTS(state, testResults) {
    state.testResults = testResults;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
