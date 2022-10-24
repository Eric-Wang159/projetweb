import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CPUPage',
    name: 'CPUPage',
    component: () => import('../components/CPUPage.vue')
  },
  {
    path: '/MemoryPage',
    name: 'MemoryPage',
    component: () => import('../components/MemoryPage.vue')
  },
  {
    path: '/StoragePage',
    name: 'StoragePage',
    component: () => import('../components/StoragePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
