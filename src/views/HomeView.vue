<script>
import { RouterLink, RouterView } from 'vue-router'
import MainImageTitle from '@/components/HomeView/MainImageTitle.vue'
import GolosInfo from '@/components/HomeView/GolosInfo.vue'
import OrderCall from '@/components/HomeView/OrderCall.vue'
import Features from "@/components/HomeView/Features.vue"


export default {
  data() {
    return{
  
    }
  },
  methods: {
    scrollTo(refName){
      this.$refs[refName].$el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  components: {
    MainImageTitle,
    GolosInfo,
    OrderCall,
    Features
  }
}
</script>

<template>
  <main class="main">
    <MainImageTitle @scroll-to="scrollTo"/>
    <GolosInfo ref="golos-info"/>
    <OrderCall ref="order-call"/>
    <Features/>
      <div>
      asdasd
    </div>
      <div>
      asdasd
    </div>
      <div>
      asdasd
    </div>
      <div>
      asdasd
    </div>
      <div>
      asdasd
    </div>
  </main>
  
</template>

<style scoped>


  .main {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;    
}

</style>
