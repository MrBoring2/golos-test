<script>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'
import eventBus from '@/scripts/event-bus'
import MainImageTitle from '@/components/HomeView/MainImageTitle.vue'
import GolosInfo from '@/components/HomeView/GolosInfo.vue'
import OrderCall from '@/components/HomeView/OrderCall.vue'
import Advanteges from "@/components/HomeView/Advanteges.vue"
import Slider from "@/components/Slider.vue"
import PreFinishing from '@/components/HomeView/PreFinishing.vue'
import AboutTheBuilder from '@/components/HomeView/AboutTheBuilder.vue'
import AnyQuestions from '@/components/AnyQuestions.vue'
import Features from '@/components/HomeView/Features.vue'
import PromoBlock from '@/components/HomeView/PromoBlock.vue'
import IpotecaVariants from '@/components/HomeView/IpotecaVariants.vue'

import architecture from './../assets/images/slider-images/architecture.png'
import bulvar from './../assets/images/slider-images/bulvar.png'
import holls from './../assets/images/slider-images/holls.png'
import infrastructure from './../assets/images/slider-images/infrastructure.png'
import yard from './../assets/images/slider-images/yard.png'
import parking from './../assets/images/slider-images/parking.png'
import lenina4 from './../assets/images/slider-images/4lenina.png'
import golosLTown from './../assets/images/slider-images/golos-l-town.png'
import nuton from './../assets/images/slider-images/nuton.png'
import golosVSerdce from './../assets/images/slider-images/golos-v-serdce.png'

export default {
  data() {
    return{
      sliderFeaturesTitle: "Особенности проекта",
      sliderFeaturesContent: [
        {
          image: architecture,
          title: "Архитектура: игра и формы цвета",
          description: "«Голос Кашириных» меняет привычный облик северо-запада. Фасады домов индивидуальны и продуманы так, будто у каждого из них был свой архитектор."
        },
         {
          image: bulvar,
          title: "Собственный бульвар",
          description: "Главная изюминка проекта – собственный бульвар, усаженный зеленью, с кафе и ресторанами, детскими и спортивными площадками и малыми архитектурными формами."
        },
        {
          image: holls,
          title: "Дизайнерские холлы",
          description: "Главная изюминка проекта – собственный бульвар, усаженный зеленью, с кафе и ресторанами, детскими и спортивными площадками и малыми архитектурными формами."
        },
        {
          image: parking,
          title: "Парковочное пространство",
          description: "Парковка будет представлена в подземном и наземном вариантах, общим количеством 1578 парковочных мест. Также рядом с кварталом уже есть существующая многоуровневая парковка на 800 машиномест."
        },
        {
          image: infrastructure,
          title: "Готовая инфраструктура",
          description: "Все необходимое для комфортной жизни: магазины, рестораны, фитнес-центры, детские сады, школы, больницы - все в шаговой доступности."
        },
        {
          image: yard,
          title: "Дворовые пространства",
          description: "Уютные и безопасные дворы без машин. Зоны для детских игр располагаются на удалении от мест спокойного отдыха."
        }
      ],
      sliderProjectsTitle: "Наши проекты",
      sliderProjectsContent: [
        {
          image: golosLTown,
          title: "Голос L-Town",
          description: "",
          href: "https://golos.click/projects/l-town/"
        },
        {
          image: lenina4,
          title: "4 Ленина",
          description: "",
           href: "https://golos.click/projects/lenina4/"
        },
        {
          image: nuton,
          title: "Ньютон",
          description: "",
           href: "https://golos.click/projects/newton/"
        },
        {
          image: golosVSerdce,
          title: "Голос в сердце города",
          description: "",
           href: "https://golos.click/projects/aloepole/"
        }
      ],
      sliderMaxVisibleItems: 4,
      sliderMinVisibleItems: 1,  
      discountPromoBlockContent: {
        icon: "heart",
        title: "Получите скидку 10%",
        description: "При 100% оплате кваритры",
        buttonTitle: "Узнать подробнее"
      },
      likedPlanningPromoBlockContent: {
        icon: "percent",
        title: "Понравилась планировка?",
        description: "Оставьте заявку, а мы пришлем подборку квартир и расскажем о проекте.",
        buttonTitle: "Оставьте заявку"
      }
    }
  },
  mounted() {
     eventBus.$on('scroll-to', this.scrollTo)
 
  },
  beforeUnmount() {
     eventBus.$off('scroll-to', this.scrollTo)
  },
  methods: {
    scrollTo(refName){

      const element = this.$refs[refName];
    
    // Для компонентов Vue
    if (element && element.$el) {
      element.$el.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } 
    // Для обычных DOM-элементов
    else if (element) {
      element.scrollIntoView({
        behavior: 'smooth', block: 'nearest', inline: 'start'
      });
    } else {
      console.error(`Элемент с ref="${refName}" не найден`);
    }
  
    }
  },
  components: {
    MainImageTitle,
    GolosInfo,
    OrderCall,
    Slider,
    Advanteges,
    PreFinishing,
    AboutTheBuilder,
    Features,
    AnyQuestions,
    PromoBlock,
    IpotecaVariants
  }
}
</script>

<template>
  <main class="main">
    <MainImageTitle @scroll-to="scrollTo"/>
    <GolosInfo ref="golos-info" id="golos-info"/>
    <OrderCall ref="order-call"/>
    <Slider class="slider" :title="sliderFeaturesTitle" :content="sliderFeaturesContent" :maxVisibleItems="sliderMaxVisibleItems" 
                  :minVisibleItems="sliderMinVisibleItems"  :canOpenConsultationDrawer="true"/>
    <Advanteges/>
    <PreFinishing ref="pre-finishing" id="pre-finishing"/>
   
    <Slider class="slider"  :title="sliderProjectsTitle" :content="sliderProjectsContent" :maxVisibleItems="sliderMaxVisibleItems"
                 :minVisibleItems="sliderMinVisibleItems"/>
    <IpotecaVariants id="ipoteca-variants"/>
    <PromoBlock :title="discountPromoBlockContent.title" :description="discountPromoBlockContent.description" 
              :icon="discountPromoBlockContent.icon" :buttonTitle="discountPromoBlockContent.buttonTitle"/>
    <Features class="features"/>
    <PromoBlock :title="likedPlanningPromoBlockContent.title" :description="likedPlanningPromoBlockContent.description" 
              :icon="likedPlanningPromoBlockContent.icon" :buttonTitle="likedPlanningPromoBlockContent.buttonTitle"/>
     <AboutTheBuilder id="about-the-builder" ref="about-the-builder"/>   
      <AnyQuestions class="questions"/>
 </main>
  
</template>

<style scoped>


  .main {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;   
    gap: 80px; 
    
}
.slider {
  width: 60%;
}
 @media (max-width: 900px) {
   .features {
    display: none;
   }

   .main {
    gap: 40px;
   }
 }
</style>
