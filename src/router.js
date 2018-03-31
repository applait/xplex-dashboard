import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Login from './views/login.vue'
import Profile from './views/profile.vue'
import Debug from './views/debug.vue'
import E404 from './views/404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/debug',
      name: 'debug',
      component: Debug
    },
    {
      path: '*',
      name: '404',
      component: E404
    }
  ]
})
