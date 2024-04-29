import { createRouter, createWebHistory } from 'vue-router'
import StaticView from '@/views/StaticView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'static',
      component: StaticView
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: () => import('../views/DynamicView.vue')
    }
  ]
})

export default router
