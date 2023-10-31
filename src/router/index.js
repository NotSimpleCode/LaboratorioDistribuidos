import { createRouter, createWebHistory } from 'vue-router'
import MainInfoView from '../views/MainInfoView.vue'
import LoginRegisterView from '../views/LoginRegisterView.vue'
import UpdateForm from '../views/UpdateForm.vue'
import { useAuthStore } from '../store/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginRegisterView,
      meta: {
        authRequired: false
      }
    },
    {
      path: '/',
      name: 'information',
      component: MainInfoView,
      meta: {
        authRequired: true,
      }
    },
    {
      path: '/update',
      name: 'updateForm',
      component: UpdateForm,
      meta: {
        authRequired: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuth = useAuthStore().onlineUser.token
  if ((to.meta.authRequired) && (!isAuth)) {
    next('login')
  } else {
    next()
  }
})

export default router
