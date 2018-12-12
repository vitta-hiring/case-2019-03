import 'vue-vi-ui/dist/vi-ui.min.css';

import Vue from 'vue'
import ViUi from 'vue-vi-ui'

Vue.use(ViUi);

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
