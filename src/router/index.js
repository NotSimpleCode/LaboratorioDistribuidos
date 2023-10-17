import { createRouter, createWebHistory } from 'vue-router'
import MainInfoView from '../views/MainInfoView.vue'
import LoginRegisterView from '../views/LoginRegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginRegisterView
    },
    {
      path: '/information',
      name: 'information',
      component: MainInfoView
    }

    // path: '/rolls',
    // name: 'rolls',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../components/RolesInfo.vue')
  ]
})

export default router
