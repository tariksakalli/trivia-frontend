/* eslint-disable no-shadow */
import api from '@/api';

const state = {
  user: null,
};

const getters = {};

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
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
