import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/store';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
new Vue({
  store:store,
  el:"#app",
  router:router,
  render: h => h(App),
})
