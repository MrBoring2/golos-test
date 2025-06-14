<script>
import info from './../../assets/images/info.png'

export default {
  data() {
    return{
      info_img: info,
      fullImgSizeDisplay: false
    }
  },

  methods: {
    openFullSizeImg(){
      this.fullImgSizeDisplay = true
      document.addEventListener('keydown', this.handleKeyDown)
    },
    closeFullSizeImg(){
      this.fullImgSizeDisplay = false
      document.removeEventListener('keydown', this.handleKeyDown)
    },
    handleKeyDown(event){
      if(event.key === 'Escape'){
        this.closeFullSizeImg();
      }
      document.removeEventListener('keydown', this.handleKeyDown)
    }
  }
}
</script>

<template>
  <div class="golos-info-container">
    <div class="golos-info-content">
      <div class="info-text">
        <div class="info-text-container">
          <p class="info-text-title">О проекте</p>
          <p class="info-text-content">«Голос Кашириных» — это жилой квартал комфорт-класса с корпусами переменной этажности, готовой инфраструктурой и архитектурой, 
            характерной для старинных районов европейских городов. Здания комплекса расположены близко друг к другу и выполнены в разных стилях.</p>
          <p  class="info-text-content">
            Для придания уюта, как на европейских улочках, на ряде секций создан эффект разделения фасада по высоте на два объёма -
             на верхних этажах как будто выделяется мансарда. В квартирах на верхних этажах предусмотрены террасы с видом на прогулочные зоны и внутренние дворы.
          </p>
        </div>
      </div>
      <div class="info-image-container" :style="{ backgroundImage: `url(${info_img})` }" @click="openFullSizeImg">
        <div class="size-icon-container">
          <font-awesome-icon class="size-icon" icon="fa-solid fa-arrows-alt" size="2xl"/> 
        </div>
      </div>
      <div class="mobile-only-title">
        <p>О проекте</p>
      </div>
    </div>
    <Transition>
        <div class="img-full-size"  v-if="fullImgSizeDisplay == true" >
            <img :src="info_img">   
            </img>
            <div class="icon-bold"  @click="closeFullSizeImg">
                <font-awesome-icon class="close-icon" icon="fa-solid fa-close" size="2xl"/> 
            </div>
        </div>
    </Transition>
  </div>
</template>

<style scoped>

  .golos-info-container {
    width: 80%;
    min-width: calc(var(--ui-col) * 33);
    
  }

  .golos-info-content {
    width: 100%;
    font-size: var(--font-size-normal);
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }
  .info-text {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 60%;
  }

  .info-text-container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .info-text-title {
    font-size: var(--font-size-large2);
    font-weight: 500;
  }

  .info-text-content {
    
    font-size: var(--font-size-normal2);
  }

  .info-image-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 30px;
    background-size: cover;
  
    height: 100%;
    min-width: calc(var(--ui-unit)*152);
    min-height: calc(var(--ui-unit)*132);
  
  }

  .info-image-container:hover .size-icon-container {
    display: flex;
    opacity: 1;
    transform: all 0.5 easy;
  }

  .size-icon-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: var(--vt-c-white);
    width: 50px;
    height: 50px;
    border-radius: 10px;
    border: solid;
    border-width: 1px;
    border-color: var(--vt-c-blue);
    opacity: 0;
    transition: 0.2s;
  }

  .size-icon-container:hover {
     background-color: var(--vt-c-blue);
     transform: all 0.5 easy;
  }

  .size-icon-container:hover .size-icon {
    color: var(--vt-c-white);
    transform: all 0.5 easy;
  }


  .size-icon{
    color: var(--vt-c-blue);
    transform: rotate(45deg);
  }


  .img-full-size {
    display: flex;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: var(--vt-c-white);
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 40px;
  }

  .img-full-size img {
    height: 100%;
    object-fit:cover;
  }
  
  .icon-bold {
       position: absolute;
  }

  
  .v-enter-active{
   transition: all 0.2s ease-out;
    }

  .v-leave-active {
   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .v-enter-from, .v-enter, .v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }

  .mobile-only-title{
    display: none;
  }


  @media (max-width: 1340px) {
    .golos-info-container{
      width: 100%;
      min-width: 100%;
    }
  }


  @media (max-width: 900px) {
    .golos-info-container{
      width: 100%;
    
    }

    .mobile-only-title{
      display: block;
      font-size: var(--font-size-normal4);
      font-weight: 500;
       color: var(--vt-c-dark-indigo);
    }

    .info-text {
    width: 100%;
    min-width: 100%;
    }
    .golos-info-content{
      flex-direction: column;
      flex-flow: column-reverse;
      width: 100%;
      min-width: 100%;
        gap: 20px;
      
    }
    .info-text-title{
      display: none;
    }

    .info-text-content {
      font-size: var(--font-size-normal-mini);
      color: var(--vt-c-dark-indigo);
    }

    .info-image-container {
      min-width: 100%;
       min-height: calc(var(--ui-unit)*65);
      background-size: cover;
    }
  }

</style>