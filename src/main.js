import './assets/main.css'

import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'

library.add(faPhone)
library.add(faHeart)

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.use(router)

app.mount('#app')
