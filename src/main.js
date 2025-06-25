import './assets/main.css'

import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faArrowDown, faChevronRight, faChevronLeft, faPercent, faArrowsAlt, faArrowsH, faClose,
   faCheck, faBars, faEllipsis, faBuilding, faArrowUpLong, faArrowDownLong, faList, faHeart as faHeartBold, faFilter, faGift, faChevronDown,
   faTable} from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faVk, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faHeart as faHaertHollow } from '@fortawesome/free-regular-svg-icons'
import App from './App.vue'
import router from './router'
import { VueWrapper } from '@vue/test-utils'
import VueSlider from 'vue-slider-component';
import VueSelect from "vue-select";
import 'vue-slider-component/theme/default.css'
import '@/css/slider.css'
import "vue-select/dist/vue-select.css"

library.add(faPhone, faHeartBold, faHaertHollow, faArrowDown, faTelegram, faVk, faYoutube, faChevronRight, faChevronLeft, faChevronDown,
  faPercent, faArrowsAlt, faClose, faCheck, faBars, faArrowsH, faEllipsis, faBuilding, faArrowDownLong, faArrowUpLong, faList, faTable, faFilter, faGift)

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
app.component('VueSlider', VueSlider)
app.component('v-select', VueSelect)


app.use(router)


app.directive('phone', {

})
app.directive('lazyload', lazyLoad)
app.mount('#app')
