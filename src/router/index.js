import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Index from '@/views/pages/index/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      auth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.getters['user/IS_LOGGED'] && to.meta.auth) {
    next({ name: 'Index' })
  } else if (to.name) {
    next()
  } else {
    next({ name: 'Index' })
  }
})

export default router
