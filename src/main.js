import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/ionic.js'
import Ionic from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css'
import axios from 'axios' // 追記
import VueAxios from 'vue-axios' // 追記
Vue.use(Ionic, VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
