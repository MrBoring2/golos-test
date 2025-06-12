<script>
import new_center from './../../assets/images/new_center.png'
import AdsCarousel from '@/components/HomeView/PromoCarousel.vue'

export default {
    data() {
        return {
            new_center_img: new_center
        }
    },
    methods: {
        moveToGolosInfo() {
            this.$emit('scroll-to', 'golos-info')
        }
    },
    components: {
        AdsCarousel
    }
}
</script>

<template>
    <div class="main-title">
        <div class="img-container">
            <img :src="new_center_img"></img>
        </div>
        <div class="top-title-container">
            <div class="main-title-container">
                <p>ㅤ</p>
                <p>НОВЫЙ ЦЕНТР</p>
                <p>СЕВЕРО ЗАПАДА</p>
            </div>
            <div class="sub-title-container">
                <p>Квартиры с предчистовой отделкой</p>
            </div>
            <div class="learn-more">
                <button>Узнать бодробнее</button>
            </div>
        </div>
        <div class="bottom-title-container">
            <div class="btn-down">
                <button @click="moveToGolosInfo">
                    <font-awesome-icon icon="fa-solid fa-arrow-down" size="xl"/> 
                </button>
            </div>
            <AdsCarousel/>
        </div>
      </div>
</template>

<style scoped>

.main-title {
    position: relative;
    height: 100vh;
    width: 100%;
    min-height: 800px;
    gap: 40px;
    display: flex;
    align-items:center;
    justify-content: space-between;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    left: 0;
}

.img-container {
    z-index: -100;
    width: 100%;
      min-height: 800px;
    position: absolute;

}

.img-container img {
     min-height: 800px;
    width: 100%;
    min-width: 1320px;
    height: 100vh;
    object-fit: cover;
}

.top-title-container{
 
    min-width: 80%;
    display: flex;
    gap: 40px;
    flex-direction: column;
   
}

  
.main-title-container {
    padding-left: 10px;
    position: relative;
    line-height: 1;
    color: white;
    font-weight: bold;
    font-size: var(--font-size-extra-large);
    margin-top: 20px;
    margin-left: -5px;
    width: 80%;
    min-width: calc(var(--ui-col) * 33);
    display: flex;
    flex-direction: column;
}
  

  
.sub-title-container {
    padding-left: 10px;
    color: var(--vt-c-white);
    font-size: var(--font-size-normal2);
    font-weight: bold;
    width: 80%;
    min-width: calc(var(--ui-col) * 33);
}

.learn-more {
     padding-left: 10px;
    width: 80%;
    min-width: calc(var(--ui-col) * 33);
}
 

.learn-more button {
     width: 200px;
     height: 50px;
     border-radius: 10px;
     border-width: 0;
     background-color: var(--vt-c-white);
     transition: 0.2s;
}

.learn-more button:hover {
    background-color: var(--vt-c-dark-purple);
    color: var(--vt-c-white);
    transform: all 0.5 easy;
}

.bottom-title-container {
    min-width: calc(var(--ui-col) * 33);
    width: 80%;
    padding-left: 5px;
    margin-bottom: 100px;
    display: flex;
    justify-content: space-between;
    align-items: end;
}


.btn-down button{
    color: var( --vt-c-white);
    background-color: var(--vt-c-dark-purple);
    height: 60px;
    width: 60px;
    border-radius: 40px;
    border-width: 0;
    font-size: var(--font-size-normal);
    text-align: center;
    transition: 0.2s;
}


.btn-down button:hover {
    background-color: var( --vt-c-blue);
    transform: all 0.5 easy;
}
</style>