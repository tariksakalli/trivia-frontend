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
  // Recall Listening
  {
    path: '/recall-listening-info',
    name: 'RecallListeningInfo',
    component: () => import(/* webpackChunkName: "recallListening" */ '../views/RecallListening/Listening/ListeningInfo.vue'),
  },
  {
    path: '/recall-listening-demo',
    name: 'RecallListeningDemo',
    component: () => import(/* webpackChunkName: "recallListening" */ '../views/RecallListening/Listening/ListeningDemo.vue'),
  },
  {
    path: '/recall-listening-test',
    name: 'RecallListeningTest',
    component: () => import(/* webpackChunkName: "recallListening" */ '../views/RecallListening/Listening/ListeningTest.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
