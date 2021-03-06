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

  // Listening
  {
    path: '/listening-info',
    name: 'ListeningInfo',
    component: () => import(/* webpackChunkName: "listening" */ '../views/Listening/ListeningInfo.vue'),
  },
  {
    path: '/listening-demo',
    name: 'ListeningDemo',
    component: () => import(/* webpackChunkName: "listening" */ '../views/Listening/ListeningDemo.vue'),
  },
  {
    path: '/listening-test',
    name: 'ListeningTest',
    props: true,
    component: () => import(/* webpackChunkName: "listening" */ '../views/Listening/ListeningTest.vue'),
  },

  // Speaking
  {
    path: '/speaking-info',
    name: 'SpeakingInfo',
    component: () => import(/* webpackChunkName: "speaking" */ '../views/Speaking/SpeakingInfo.vue'),
  },
  {
    path: '/speaking-demo',
    name: 'SpeakingDemo',
    component: () => import(/* webpackChunkName: "speaking" */ '../views/Speaking/SpeakingDemo.vue'),
  },
  {
    path: '/speaking-test',
    name: 'SpeakingTest',
    props: true,
    component: () => import(/* webpackChunkName: "speaking" */ '../views/Speaking/SpeakingTest.vue'),
  },

  // NBack
  {
    path: '/nback-info',
    name: 'NBackInfo',
    component: () => import(/* webpackChunkName: "nback" */ '../views/NBack/NBackInfo.vue'),
  },
  {
    path: '/nback-demo',
    name: 'NBackDemo',
    component: () => import(/* webpackChunkName: "nback" */ '../views/NBack/NBackDemo.vue'),
  },
  {
    path: '/nback-test',
    name: 'NBackTest',
    props: true,
    component: () => import(/* webpackChunkName: "nback" */ '../views/NBack/NBackTest.vue'),
  },

  // FillInTheBlanks
  {
    path: '/fillintheblanks-info',
    name: 'FillInTheBlanksInfo',
    component: () => import(/* webpackChunkName: "fillintheblanks" */ '../views/FillInTheBlanks/FillInTheBlanksInfo.vue'),
  },
  {
    path: '/fillintheblanks-demo',
    name: 'FillInTheBlanksDemo',
    component: () => import(/* webpackChunkName: "fillintheblanks" */ '../views/FillInTheBlanks/FillInTheBlanksDemo.vue'),
  },
  {
    path: '/fillintheblanks-test',
    name: 'FillInTheBlanksTest',
    props: true,
    component: () => import(/* webpackChunkName: "fillintheblanks" */ '../views/FillInTheBlanks/FillInTheBlanksTest.vue'),
  },

  // MultipleChoice
  {
    path: '/multiplechoice-info',
    name: 'MultipleChoiceInfo',
    component: () => import(/* webpackChunkName: "multiplechoice" */ '../views/MultipleChoice/MultipleChoiceInfo.vue'),
  },
  {
    path: '/multiplechoice-test',
    name: 'MultipleChoiceTest',
    props: true,
    component: () => import(/* webpackChunkName: "multiplechoice" */ '../views/MultipleChoice/MultipleChoiceTest.vue'),
  },

  // Admin
  {
    path: '/admin-menu',
    name: 'AdminMenu',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/AdminMenu.vue'),
    children: [
      {
        path: '/studentslist',
        name: 'StudentsList',
        component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/StudentsList.vue'),
      },
      {
        path: '/studentresults/:id',
        name: 'StudentResults',
        component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/StudentResults.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
