import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/common/Home.vue';
import Info from '../views/common/Info.vue';
import Survey from '../views/common/Survey.vue';
import Warning from '../views/common/Warning.vue';
import TestInfo from '../views/common/TestInfo.vue';

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
  {
    path: '/test-info',
    name: 'TestInfo',
    component: TestInfo,
  },
  {
    path: '/dummy',
    name: 'Dummy',
    component: () => import('../views/common/Dummy.vue'),
  },

  // Recall Listening
  {
    path: '/listening-info',
    name: 'ListeningInfo',
    component: () => import(/* webpackChunkName: "recallListening" */ '../views/Listening/ListeningInfo.vue'),
  },
  {
    path: '/listening-demo',
    name: 'ListeningDemo',
    component: () => import(/* webpackChunkName: "recallListening" */ '../views/Listening/ListeningDemo.vue'),
  },
  {
    path: '/listening-test',
    name: 'ListeningTest',
    props: true,
    component: () => import(/* webpackChunkName: "recallListening" */ '../views/Listening/ListeningTest.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
