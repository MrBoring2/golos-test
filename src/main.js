import './assets/main.css'

import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faHeart, faArrowDown, faChevronRight, faChevronLeft, faPercent } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faVk, faTelegram } from '@fortawesome/free-brands-svg-icons'
import App from './App.vue'
import router from './router'

library.add(faPhone, faHeart, faArrowDown, faTelegram, faVk, faYoutube, faChevronRight, faChevronLeft, faPercent)


const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.use(router)

app.mount('#app')
