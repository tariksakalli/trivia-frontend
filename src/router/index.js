import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/common/Home.vue';
import Info from '../views/common/Info.vue';
import Survey from '../views/common/Survey.vue';
import Warning from '../views/common/Warning.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/info',
    name: 'Info',
    component: Info,
  },
  {
    path: '/survey',
    name: 'Survey',
    component: Survey,
  },
  {
    path: '/warning',
    name: 'Warning',
    component: Warning,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
