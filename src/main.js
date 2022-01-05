import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios.js'
import uuid from './plugins/uuid.js'
import commonComponents from './components/common/index.js'

Vue.config.productionTip = false

Vue.prototype.$api = axios
Vue.prototype.$uuid = uuid

for (let component of commonComponents) {
  Vue.component(component.name, component)
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
