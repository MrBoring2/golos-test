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
    <div class="main-image-title-container">
        <div class="main-title-content">
        <img :src="new_center_img" class="main-title-img"></img>
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
            <AdsCarousel class="carousel-desktop"/>
        </div>
      </div>
      <AdsCarousel class="carousel-mobile"/>          
    </div>
</template>

<style scoped>


.main-title-content {
     box-sizing: border-box;
    position: relative;
    min-height: calc(100dvh - var(--header-heigth));
    min-width: 100%;
    display: flex;
    align-items:center;
    flex-direction: column;
    justify-content: space-between;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
}
.main-image-title-container {
    width: 100%;
   
}

.main-title-img {
    z-index: -100;
     position: absolute;
    object-fit: cover;
    filter: brightness(70%);
    width: 100%;
    height: 100%;
   
}

.top-title-container{
 
    width: 80%;
    min-width: calc(var(--ui-col) * 33);
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
    width: 80%;
    min-width: calc(var(--ui-col) * 33);
    padding-left: 5px;
    margin-bottom: 10px;
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

.carousel-mobile {
    display: none;
}



@media (max-width: 900px) {
    .main-title-container{
        font-size: var(--font-size-normal4);
    
    }

    .main-title-container, .sub-title-container, .learn-more {
        min-width: 100%;
    }


    .main-title-content {
       position: relative;
       align-items: start;
       min-width: 300px;
       width: 100%;
    }
    
    .learn-more {
        width: 100%;
        padding: 0 10px;
    }
    .learn-more button {
        width: 100%;
    }


    .img-container {
        width: 100%;
        min-width: 100%;
    }
    .top-title-container{
        min-width: 300px;
        gap: 20px;
        width: 100%;
    }
    .sub-title-container {
        font-size: var(--font-size-normal);
    }
    
    .bottom-title-container {
        width: 100%;
        min-width: 100%;
        justify-content: space-around;
    }
    .btn-down, .carousel-desktop {
        display: none;
    }

    .carousel-mobile{
        display: flex;
    }
}
</style>