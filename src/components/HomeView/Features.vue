<script>
import garderobnaya from './../../assets/images/features/garderobnaya.png'
import master_spalna from './../../assets/images/features/master-spalna.png'
import okno_v_vannoi from './../../assets/images/features/okno-v-vannoi.png'
import teplaya_lojiya from './../../assets/images/features/teplaya-lojiya.png'
import potolki from './../../assets/images/features/potolki.png'

export default {
    data() {
        return {
            garderobnayaImg: garderobnaya,
            masterSpalnaImg: master_spalna,
            oknoVVannoiImg: okno_v_vannoi,
            teplayaLojia: teplaya_lojiya,
            potolkiImg: potolki
        }
    },
    inject: ['openConsultationRequestDrawer'],
    methods: {
        openDrawer() {
            this.openConsultationRequestDrawer();
        }
    }
}

</script>

<template>
    <div class="features-container">
        <div class="features-content-title">
            <p>Особенности</p>
        </div>
        <div class="features-content">
            <div class="feature-item" @click="openDrawer">
                <div class="feature-item-title">
                    <p>Теплая лоджия</p>
                </div>
                <div class="feature-item-img-container">
                    <img :src="teplayaLojia" class="feature-item-img"/>
                </div>
            </div>
            <div class="feature-item" @click="openDrawer">
                <div class="feature-item-title">
                    <p>Мастер-спальня</p>
                </div>
                <div class="feature-item-img-container">
                    <img :src="masterSpalnaImg" class="feature-item-img"/>
                </div>
            </div>
              <div class="feature-item" @click="openDrawer">
                <div class="feature-item-title">
                    <p>Гардеробная</p>
                </div>
                <div class="feature-item-img-container">
                    <img :src="garderobnayaImg" class="feature-item-img"/>
                </div>
            </div>
              <div class="feature-item" @click="openDrawer">
                <div class="feature-item-title">
                    <p>Окно в ванной</p>
                </div>
                <div  class="feature-item-img-container">
                    <img :src="oknoVVannoiImg" class="feature-item-img"/>
                </div>
            </div>
              <div  class="feature-item" @click="openDrawer">
                 <div class="feature-item-title">
                     <p>Потолки до 3,6 меторов</p>
                </div>
               
                <div class="feature-item-img-container  " >
                    <img :src="potolkiImg" class="feature-item-img"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .features-container {
        width: 60%;
        justify-content: center;
        flex-direction: column;
        display: flex;
         min-width: calc(var(--ui-col) * 33);
        
     
    }

    .features-content-title {
        font-size: var(--font-size-large2);
        font-weight: 500;
        padding-bottom: 3rem;
    }

    .features-content {
        width: 100%;
        display: grid;
        grid-template-columns: 25rem 35rem auto;
        grid-template-rows: auto auto auto;
        gap: 15px;
    }

    .feature-item {
        align-items: end;
        padding-left: 2rem;
        padding-bottom: 2rem;
        display: flex;
        position: relative;
        border-radius: 1.5rem;
        height: 100%;
        top:0;
   
        transition: top 0.3s ease;
    }
    .feature-item-img {
       filter: brightness(90%);
        position: absolute;
        width: 100%;
        z-index: -1;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 1.5rem;
        object-fit: cover;
        object-position: center;
      
    }

    .feature-item-title {
        color: var(--vt-c-white);
         font-weight: 500;
        align-items: center;
        font-size: var(--font-size-normal3);
    }

    .feature-item:hover {
        top: -0.5rem;
    }

    .feature-item:nth-child(1) {
        grid-row: span 2;
        height: 36rem;
        object-fit: cover;
        object-position: center;
    }
     .feature-item:nth-child(2) {
        grid-column: span 2;
        
    }
      .feature-item:nth-child(3) {
        
    }
    .feature-item:nth-child(4) {
        
    }
    .feature-item:nth-child(5) {
        grid-column: span 3;
        height: 20rem;
    }

    .v-enter-active .drawer-back,
    .v-leave-active .drawer-back {
        transition: transform 0.3s ease;
    }
    .v-enter-from .drawer-back,
    .v-leave-to .drawer-back {
        transform: translateX(100%);
    }
</style>