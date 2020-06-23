import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user';
import admin from '@/store/modules/admin';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    admin,
  },
  debug: true,
});
