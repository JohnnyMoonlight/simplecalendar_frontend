import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

library.add(faSpinner);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Datetime);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
