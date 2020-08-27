import Vue from 'vue'
import Vuex from 'vuex'

import credit from './credit/credit.module';
import sms from './sms/sms.module';
import user from './user/user.module';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    credit,
    sms,
    user
  }
})
