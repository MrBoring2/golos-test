import './assets/main.css'

import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faHeart, faArrowDown, faChevronRight, faChevronLeft, faPercent, faArrowsAlt, faArrowsH, faClose, faCheck, faBars } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faVk, faTelegram } from '@fortawesome/free-brands-svg-icons'
import App from './App.vue'
import router from './router'
import { VueWrapper } from '@vue/test-utils'


library.add(faPhone, faHeart, faArrowDown, faTelegram, faVk, faYoutube, faChevronRight, faChevronLeft, faPercent, faArrowsAlt, faClose, faCheck, faBars, faArrowsH)

const lazyLoad = {
   mounted(el, binding) {
    const loadImage = () => {
      const img = new Image();
      img.src = binding.value;
      img.onload = () => {
        el.src = binding.value;
        el.classList.add("loaded");
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestIdleCallback(loadImage, { timeout: 500 }); // Запускаем в фоне
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "200px", threshold: 0 }
    );
    observer.observe(el);
  },
};

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.use(router)


app.directive('phone', {

})
app.directive('lazyload', lazyLoad)
app.mount('#app')
