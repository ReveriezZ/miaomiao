import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
// import Header from '@/components/Header';
// import TabBar from '@/components/TabBar';

Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
});

// Vue.component('Header', Header);
// Vue.component('TabBar', TabBar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
