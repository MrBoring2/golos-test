<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AdsCarousel from './components/HomeView/PromoCarousel.vue'
import CookieAgree from './components/CookieAgree.vue'
import ConsultationRequest from './components/ConsultationRequest.vue'
import logo from './assets/images/logo.png'
import { computed } from 'vue'


export default {
    data() {
      return{
      logo: logo,
      isCoockiesAccept: false,
      constultationRequestDrawerOpend: false
      };
    },
    components: {
      Header: Header,
      Footer,
      AdsCarousel,
      RouterLink,
      RouterView,
      CookieAgree,
      ConsultationRequest,
    },
    methods: {
      proceedCookies() {
        //что-то с куками
        console.log('чтение куки')
      },
      openConsultationRequestDrawer() {
        this.$refs.consultationRequestDrawer.openDrawer()
      }
    },
    provide() {
      return{
        openConsultationRequestDrawer:  this.openConsultationRequestDrawer
      }
    }
  }
</script>

<template> 
  <ConsultationRequest ref="consultationRequestDrawer"/>
  <CookieAgree @accept-cookies="proceedCookies"/>
  <Header/>
  <div class="main-body">
    <div class="container">
      <RouterView />
    </div>
  </div>
  <Footer/>
  
  
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

@media (max-width: 900px) {

  .container {
    min-width: 100%;
  }

}



</style>
