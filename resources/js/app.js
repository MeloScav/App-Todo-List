require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

import App from './App.vue';
Vue.use(VueAxios, axios);

import 'es6-promise/auto'
import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'
import auth from './auth'

import HomeComponent from './components/HomeComponent.vue';
import CreateComponent from './components/CreateComponent.vue';
import IndexComponent from './components/IndexComponent.vue';
import EditComponent from './components/EditComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import DashboardUserComponent from './components/DashboardUserComponent.vue';
import DashboardAdminComponent from './components/DashboardAdminComponent.vue';


const routes = [
  {
      name: 'home',
      path: '/',
      component: HomeComponent
  },
  {
    path: '/Inscription',
    name: 'register',
    component: RegisterComponent,
    meta: {
      auth: false
    }
  },
  {
    path: '/Connexion',
    name: 'login',
    component: LoginComponent,
    meta: {
      auth: false
    }
  },
  // USER ROUTES
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardUserComponent,
    meta: {
      auth: true
    }
  },
  // ADMIN ROUTES
  {
    path: '/admin',
    name: 'admin.dashboard',
    component: DashboardAdminComponent,
    meta: {
      auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
    }
  },
  {
      name: 'create',
      path: '/create',
      component: CreateComponent
  },
  {
      name: 'tasks',
      path: '/tasks',
      component: IndexComponent
  },
  {
      name: 'edit',
      path: '/edit/:id',
      component: EditComponent
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});
const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');

// Set Vue authentication
Vue.use(VueAxios, axios)
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`
Vue.use(VueAuth, auth)
