import Vue from 'vue'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import 'mdi/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
