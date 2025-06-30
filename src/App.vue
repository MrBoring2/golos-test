<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AdsCarousel from './components/HomeView/PromoCarousel.vue'
import AnyQuestions from './components/AnyQuestions.vue'
import CookieAgree from './components/CookieAgree.vue'
import ConsultationRequest from './components/ConsultationRequest.vue'
import logo from './assets/images/logo.webp'
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
      AnyQuestions
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
:deep(.vs__dropdown-toggle) {
  border: none !important;
  padding-right: 1rem;
  align-items: center;
  min-height: 2.5rem;
  border-radius: 0.5rem;
  background: var(--vt-c-light-gray) !important;
}

:deep(.custom-multiselect .vs__search) {
  font-size: var(--font-size-normal-mini);
  padding-left: 1.1rem;
}

:deep(.vs__search::placeholder) {
  padding-left: 1.25rem;
  font-size: var(--font-size-mini);
}
:deep(.vs__selected-options) {
    display: flex !important;
    flex-wrap: wrap !important;
    width: 100vw;
}
:deep(.vs__search), 
:deep(.vs__search:focus) {
  border: none !important;
  padding: 0 !important;
}
:deep(.vs__dropdown-menu) {
  border: none !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Можно добавить тень вместо границы */
}

:deep(.vs__actions) {
  padding: 0 !important;
}

:deep(.custom-multiselect .vs__selected) {
    padding-left: 1.1rem;
    font-weight: bold;
    font-size: var(--font-size-normal-mini);
    background: var(--vt-c-blue);
    color: var(--vt-c-white);
    display: flex;
    gap:1rem;
    transition: 0.3s;
}

:deep(.custom-multiselect .vs__selected:hover) {
    background: var(--vt-c-light-blue-lighter);
    transform: all 0.5s ease;
}

:deep(.custom-multiselect .vs__deselect) {
  fill: white !important;
}

:deep(.custom-multiselect .vs__selected-option) {
   
 display: flex;
}

:deep(.vs__dropdown-option) {
  transition: all 0.3s ease;
  transition: background-color 0.3s ease, color 0.2s ease, transform 0.2s ease;
}

:deep(.vs__dropdown-option--highlight) {
   background: var(--vt-c-blue);
   color: white; 
}



@media (max-width: 900px) {

  .container {
    min-width: 100%;
  }

}

</style>
