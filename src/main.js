import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import commonComponents from './components/common/index.js'

Vue.config.productionTip = false

for (let component of commonComponents) {
  Vue.component(component.name, component)
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
