import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import feather from 'vue-icon';
import VueExcelXlsx from 'vue-excel-xlsx';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/styles.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(feather, 'v-icon');

Vue.use(VueExcelXlsx);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
