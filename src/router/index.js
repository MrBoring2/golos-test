import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RoomsCatalogView from '@/views/RoomsCatalogView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomsCatalogView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
      top: 100 
    };
  }
  if (savedPosition) {
    return {
      ...savedPosition,
      behavior: 'smooth'
  }
  }
  
  return { behavior: 'smooth', top: 0};
  },
})

export default router
