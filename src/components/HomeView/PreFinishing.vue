<script>
import pre_finihing from './../../assets/images/pre-finishing.png'

export default {
  data() {
    return{
      pre_finihing_img: pre_finihing,
      fullImgSizeDisplay: false
    }
  },
 inject: ['openConsultationRequestDrawer'],
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
    },
    openDrawer() {
      this.openConsultationRequestDrawer();
    },
    load() {
      console.log('ss')
    }
  }
}
</script>

<template>
    <div class="pre-finishing-container">
        <div class="pre-finishing-content">
            <div class="pre-finishing-image-container" @click="openFullSizeImg">
              
              <img :src="pre_finihing_img"/>
        <div class="size-icon-container">
          <font-awesome-icon class="size-icon" icon="fa-solid fa-arrows-alt" size="2xl"/> 
        </div>
      </div>
      <div class="pre-finishing-text">
        <div class="pre-finishing-text-container">
          <p class="pre-finishing-text-title">Предчистовая отделка</p>
          <div class="mobile-only-title">
          <p>Предчистовая отделка</p>
          </div>
          <div class="pre-finishing-text-content">
            <p>
                Перчень отделочных работ
            </p>
            <ul>
                <li>разводка электрической проводки до мест расположения выключателей, розеток, осветительных приборов; без оконечных устройств;</li>
                <li>вывод кабеля в санузлах под зеркало с подсветкой;</li>
                <li>выравнивание стен (гипсовая штукатурка/шпатлёвка);</li>
                <li>Оштукатуривание цементно-песчаным раствором стен в санузлах.</li>
            </ul>
            <p>

            </p>
            <p>
                Предчистовая отделка распространяется на квартиры площадью более 40 кв. м. Не суммируется с иными программами и акциями.
            </p>
          </div>
        </div>
        <div class="learn-more-button-container">
            <button @click="openDrawer">Узнать подробнее</button>
        </div>
      </div>   
    </div>
    <Transition>
        <div class="img-full-size"  v-if="fullImgSizeDisplay == true" >
            <img :src="pre_finihing_img">   
            </img>
            <div class="icon-bold"  @click="closeFullSizeImg">
                <font-awesome-icon class="close-icon" icon="fa-solid fa-close" size="2xl"/> 
            </div>
        </div>
    </Transition>
  </div>
</template>

<style scoped>
  .pre-finishing-container {
    width: 60%;
    min-width: calc(var(--ui-col) * 33);
    
  }

  .pre-finishing-content {
    width: 100%;
    font-size: var(--font-size-normal);
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    gap: 3rem;
  }
  .pre-finishing-text {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 3rem;
  }

  .pre-finishing-text-container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .pre-finishing-text-title {
    font-size: var(--font-size-large2);
    font-weight: 500;
  }

  .pre-finishing-text-content {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    font-size: var(--font-size-normal);
      text-align: start;
         color: var(--vt-c-middle-gray);
  }
  .pre-finishing-text-content ul {
    list-style: outside;
    padding: 0 0 0 1.4rem;
    text-align: start;

  }
  

  .pre-finishing-image-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    min-width: 40rem;
    min-height: 40rem;
  
  }

    .pre-finishing-image-container img{
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 2rem;
    height: 100%;
    position: absolute;
  }

  .pre-finishing-image-container:hover .size-icon-container {
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

  .learn-more-button-container button{
    width: 15rem;
    height: 3rem;
    border-radius: 10px;
    background-color: var(--vt-c-blue);
    border-width: 0;
    color: var(--vt-c-white);
    font-size: var(--font-size-normal);
    transition: 0.2s;
  }

  .learn-more-button-container button:hover {
    background-color: var(--vt-c-light-blue);
    transform: all 0.5 easy;
  }

  .img-full-size img {
    height: 95%;
    object-fit:cover;
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
    .pre-finishing-container{
      width: 100%;
      min-width: 100%;
    }
  }


  @media (max-width: 900px) {
    .pre-finishing-container{
      width: 100%;
    
    }

    .mobile-only-title{
      display: block;
      font-size: var(--font-size-normal4);
      font-weight: 500;
       color: var(--vt-c-dark-indigo);
    }

    .pre-finishing-text {
    width: 100%;
    min-width: 100%;
    }
    .pre-finishing-content{
      flex-direction: column;

      width: 100%;
      min-width: 100%;
        gap: 20px;
      
    }
    .pre-finishing-text-title{
      display: none;
    }

    .pre-finishing-text-content {
      font-size: var(--font-size-normal-mini);
   
    }

    .pre-finishing-image-container {
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