import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuetify from 'vuetify/lib'
import vuetify from './plugins/vuetify';
import ApiService from "@/common/api.service";
import Toasted from 'vue-toasted';

let options = {
  position: "bottom-right",
};

Vue.use(Toasted, options);

ApiService.init();

Vue.use(Vuetify);

const opts = {};

export default new Vuetify(opts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
