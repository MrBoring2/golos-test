<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AdsCarousel from './components/HomeView/PromoCarousel.vue'
import logo from './assets/images/logo.png'


export default {
    data() {
      return{
      logo: logo,
      };
    },
    components: {
      Header: Header,
      Footer,
      AdsCarousel,
      RouterLink,
      RouterView,
    }
  }
</script>

<template> 
  <Header/>
  <div class="main-body">
    <div class="container">
      <RouterView />
    </div>
  </div>
  <Footer></Footer>
  
  
</template>

<style scoped>

.divider hr {
  border-color: var(--vt-c-light-blue);
}

.main-body{

  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  min-width: calc(var(--ui-col) * 33);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
