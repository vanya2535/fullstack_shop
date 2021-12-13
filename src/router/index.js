import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/pages/index/index'
import Main from '@/views/pages/main/index'
import Profile from '@/views/pages/profile/index'
import ProfileEdit from '@/views/pages/profile/edit'
import Lots from '@/views/pages/lots/index'
import LotsCreate from '@/views/pages/lots/create'

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
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: true
    }
  },
  {
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: ProfileEdit,
    meta: {
      auth: true
    }
  },
  {
    path: '/lots',
    name: 'Lots',
    component: Lots,
    meta: {
      auth: true,
      roles: ['SELLER']
    }
  },
  {
    path: '/lots/create',
    name: 'LotsCreate',
    component: LotsCreate,
    meta: {
      auth: true,
      roles: ['SELLER']
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const routeNames = routes.map((route) => route.name)

  if (!user && to.meta.auth) {
    next({ name: 'Index' })
  } else if (routeNames.includes(to.name)) {
    if (to.meta.roles) {
      if (to.meta.roles.includes(user.role)) {
        next()
      } else {
        next({ name: 'Index' })
      }
    } else {
      next()
    }
  } else {
    next({ name: 'Index' })
  }
})

export default router
