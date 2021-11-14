import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Index from '@/views/pages/index/index'
import Main from '@/views/pages/main/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      auth: false
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogged = JSON.parse(localStorage.getItem('user'))
  const routeNames = routes.map((route) => route.name)

  if (!isLogged && to.meta.auth) {
    next({ name: 'Index' })
  } else if (routeNames.includes(to.name)) {
    next()
  } else {
    next({ name: 'Index' })
  }
})

export default router
