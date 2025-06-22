<script>
import new_center from './../../assets/images/new_center.webp'

export default {
  data() {
    return{
      new_center_img: new_center,
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
  <div class="about-the-builder-container">
    <div class="about-the-builder-content">
      <div class="about-the-builder-text">
        <div class="about-the-builder-text-container">
          <p class="about-the-builder-text-title">О застройщике</p>
          <p class="about-the-builder-text-content">«Группа Голос» – крупная девелоперская компания Южного Урала, в портфеле которой более 1 млн м² жилой недвижимости комфорт-класса, бизнес-класса и коммерческого сектора.</p>
          <p class="about-the-builder-text-content">
            Строительный холдинг, обеспечивающий полный жизненный цикл возводимых объектов: от проектирования и строительства до эксплуатации жилых комплексов. Компания располагает проектным институтом, собственным парком техники, подрядными организациями, управляющей компанией и производством, которое обеспечивает потребности застройщика.
          </p>
          <div class="more">
            <p>Ещё</p>
          </div>
          
          <div class="go-to-site-button-container">
            <a href="https://golos.click/" target="_blank">
                <button>Перейти на сайт</button>
            </a>    
        </div>
        </div>
      </div>
      <div class="about-the-builder-image-container" @click="openFullSizeImg">
        <img :src="new_center_img"/>
        <div class="size-icon-container">
          <font-awesome-icon class="size-icon" icon="fa-solid fa-arrows-alt" size="2xl"/> 
        </div>
      </div>
      <div class="mobile-only-title">
        <p>О застройщике</p>
      </div>
    </div>
    <Transition>
        <div class="img-full-size"  v-if="fullImgSizeDisplay == true" >
            <img :src="new_center_img"/>
            <div class="icon-bold"  @click="closeFullSizeImg">
                <font-awesome-icon class="close-icon" icon="fa-solid fa-close" size="2xl"/> 
            </div>
        </div>
    </Transition>
  </div>
</template>

<style scoped>

  .about-the-builder-container {
    width: 60%;
    min-width: calc(var(--ui-col) * 33);
  }

  .about-the-builder-content {
    width: 100%;
    font-size: var(--font-size-normal);
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    gap: 3rem;
  }

  .about-the-builder-text {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 60%;
  }

  .about-the-builder-text-container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .about-the-builder-text-title {
    font-size: var(--font-size-large2);
    font-weight: 500;
  }

  .show-more-text {
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-height: 150px;
    overflow: hidden;
  }

  .show-more-text::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--ui-unit)* 8);
    pointer-events: none;
  }

  .about-the-builder-text-content {
    
    font-size: var(--font-size-normal);
  }

  .about-the-builder-image-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    min-width: 39rem;
    min-height: 35rem;
  
  }
    .about-the-builder-image-container img{
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 2rem;
    height: 100%;
    position: absolute;
  }

  .about-the-builder-image-container:hover .size-icon-container {
    display: flex;
    opacity: 1;
    z-index: 1;
    transform: all 0.5 easy;
  }

  .size-icon-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: var(--vt-c-white);
    width: 3rem;
    height: 3rem;
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

  .go-to-site-button-container button {
    width: 15rem;
    height: 3rem;
    border-radius: 10px;
    background-color: var(--vt-c-blue);
    border-width: 0;
    color: var(--vt-c-white);
    font-size: var(--font-size-normal);
    transition: 0.2s;
  }

  .go-to-site-button-container button:hover {
    background-color: var(--vt-c-light-blue);
    transform: all 0.5 easy;
  }

  .img-full-size img {
    height: 95%;
    object-fit:cover;
  }

  .more {
    display: none;
  }
  
  .icon-bold {
       position: absolute;
       width: 2.5rem;
       height: 2.5rem;
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
    .about-the-builder-container{
      width: 100%;
      min-width: 100%;
    }
  }


  @media (max-width: 900px) {
    .about-the-builder-container{
      width: 100%;
    
    }

    .mobile-only-title{
      display: block;
      font-size: var(--font-size-normal4);
      font-weight: 500;
       color: var(--vt-c-dark-indigo);
    }

    .about-the-builder-text {
    width: 100%;
    min-width: 100%;
    }
    .about-the-builder-content{
      flex-direction: column;
      flex-flow: column-reverse;
      width: 100%;
      min-width: 100%;
        gap: 20px;
      
    }
    .about-the-builder-text-title{
      display: none;
    }

    .about-the-builder-text-content {
      font-size: var(--font-size-normal-mini);
      color: var(--vt-c-dark-indigo);
    }

    .about-the-builder-image-container {
      min-width: 100%;
       min-height: calc(var(--ui-unit)*80);
      background-size: cover;
    }
     .img-full-size {
      justify-content: start;
    }

    .img-full-size img {
    width: 100%;
    height: auto;
    padding-left: 10px;
    padding-right: 10px;
   
    object-fit:cover;
    }
  }

</style>