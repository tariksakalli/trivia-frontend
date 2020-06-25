/* eslint-disable no-shadow */
import api from '@/api';
import axios from 'axios';

const state = {
  user: null,
};

const getters = {
  getToken(state) {
    return state.user.token;
  },
  getUsername(state) {
    return state.user.userInfo.name;
  },
  getTestName(state) {
    return state.user.userInfo.test;
  },
  getMessageType(state) {
    return state.user.userInfo.message_type;
  },
};

const actions = {
  login({ commit }, credentials) {
    return api.login(credentials).then(({ data }) => {
      commit('SET_USER_DATA', data);
    });
  },
};

const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData;
    axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
