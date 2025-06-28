import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FlatsCatalogView from '@/views/FlatsCatalogView.vue';


const getCssVarInPx = (varName) => {
  const remValue = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
  return parseFloat(remValue) * parseFloat(getComputedStyle(document.documentElement).fontSize)
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/flats',
      name: 'flats',
      component: FlatsCatalogView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    const headerHeight = getCssVarInPx('--header-heigth') || 78.4 
    const offset = headerHeight 
    return {
      el: to.hash,
      behavior: 'smooth',
      top: offset
    };
  }
  else if (savedPosition) {
    return {
      ...savedPosition,
      behavior: 'smooth'
  }
  }
  else {
    return {
      top: 0,
      behavior: 'smooth'
  }
}

  
  
  },
})

export default router
