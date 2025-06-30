<script>
import threeD_tour from '/flats-data/3d-tur.webp'

export default {
    data() {
        return {
            selectedImageDisplayIndex: 0,
            threeD_tourImg: threeD_tour,
            fullImgSizeDisplay: false
        }
    },
    methods: {
        getImage(path) {
            return `${path}`;
        },
        getIpoteca(price) {
            return (price - 900000) / (20 * 12);
        },
        openConsultationDrawer() {
            this.openConsultationRequestDrawer();
        },
        setActiveImageDisplay(index) {
            this.selectedImageDisplayIndex = index;
        },
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
    },
    props: ['flatData'],
    inject: ['openConsultationRequestDrawer'],
    created() {
        console.log(this.flatData)
    }
}
</script>

<template>
    <div class="flat-details-container">
        <div class="flat-images-container">  
            <Transition name="img-full-size">
            <div class="img-full-size-container" v-if="fullImgSizeDisplay == true" >
                <div class="icon-bold" @click="closeFullSizeImg">
                    <font-awesome-icon class="close-icon" icon="fa-solid fa-close" size="2xl"/> 
                </div>
                <Transition mode="out-in" >
                <div :key="selectedImageDisplayIndex" class="img-fill-size-inner">
                <div class="img-full-size-borderless" v-if="selectedImageDisplayIndex === 0">
                    <img class="plan-img-full-size" :src="getImage(flatData.Images.filter(image => image.Type == 'plan')[0].Path)"/>
                </div>
                <div class="img-full-size" v-else-if="selectedImageDisplayIndex === 2" >
                    <img class="floor-img-full-size" :src="getImage(flatData.Images.filter(image => image.Type == 'floor')[0].Path)"/>
                </div>
                <div class="img-full-size" v-else-if="selectedImageDisplayIndex === 3" >
                    <img :src="getImage(flatData.Images.filter(image => image.Type == 'housing')[0].Path)"/>
                </div>
                <div class="img-full-size" v-else-if="selectedImageDisplayIndex === 4" >
                    <img :src="getImage(flatData.Images.filter(image => image.Type == 'genplan')[0].Path)"/>
                </div>
                </div>
                </Transition>
                <div class="flat-images-controls">
                    <button class="flat-images-controls-button" @click="setActiveImageDisplay(0)" :class="{'active': selectedImageDisplayIndex == 0}">Планировка</button>
                    <button class="flat-images-controls-button" @click="setActiveImageDisplay(2)" :class="{'active': selectedImageDisplayIndex == 2}">На этаже</button>
                    <button class="flat-images-controls-button" @click="setActiveImageDisplay(3)" :class="{'active': selectedImageDisplayIndex == 3}">В корпусе</button>
                    <button class="flat-images-controls-button" @click="setActiveImageDisplay(4)" :class="{'active': selectedImageDisplayIndex == 4}">На генплане</button>
                </div>
            </div>
                     </Transition>   
            <Transition mode="out-in" >
                <div class="flat-image-inner" :key="selectedImageDisplayIndex">
                    <div class="flat-image-item"  v-if="selectedImageDisplayIndex === 0">
                        <div class="flat-image-container" @click="openFullSizeImg">
                            <img class="flat-image" :src="getImage(flatData.Images.filter(image => image.Type == 'plan')[0].Path)"/>
                            <div class="size-icon-container">
                                <font-awesome-icon class="size-icon" icon="fa-solid fa-arrows-alt" size="2xl"/> 
                            </div>
                        </div>
                    </div>
                    <div class="flat-image-item" v-else-if="selectedImageDisplayIndex === 1" >
                        <div class="flat-image-container">
                            <img class="flat-image" :src="threeD_tourImg"/>
                        </div>
                    </div>
                    <div class="flat-image-item"  v-else-if="selectedImageDisplayIndex === 2">
                        <div class="flat-image-container"  @click="openFullSizeImg">
                            <img class="flat-image floor-image" :src="getImage(flatData.Images.filter(image => image.Type == 'floor')[0].Path)"/>
                             <div class="size-icon-container">
                                <font-awesome-icon class="size-icon" icon="fa-solid fa-arrows-alt" size="2xl"/> 
                            </div>
                        </div>
                    </div>
                    <div class="flat-image-item"  v-else-if="selectedImageDisplayIndex === 3">
                        <div class="flat-image-container"  @click="openFullSizeImg">
                            <img class="flat-image" :src="getImage(flatData.Images.filter(image => image.Type == 'housing')[0].Path)"/>
                             <div class="size-icon-container">
                                <font-awesome-icon class="size-icon" icon="fa-solid fa-arrows-alt" size="2xl"/> 
                            </div>
                        </div>
                    </div>
                    <div class="flat-image-item"  v-else-if="selectedImageDisplayIndex === 4">
                        <div class="flat-image-container"  @click="openFullSizeImg">
                            <img class="flat-image" :src="getImage(flatData.Images.filter(image => image.Type == 'genplan')[0].Path)"/>
                             <div class="size-icon-container">
                                <font-awesome-icon class="size-icon" icon="fa-solid fa-arrows-alt" size="2xl"/> 
                            </div>
                        </div>
                    </div>
                </div>  
            </Transition>
            <div class="flat-images-controls">
                <button class="flat-images-controls-button" @click="setActiveImageDisplay(0)" :class="{'active': selectedImageDisplayIndex == 0}">Планировка</button>
                <button class="flat-images-controls-button" @click="setActiveImageDisplay(1)" :class="{'active': selectedImageDisplayIndex == 1}">3D-тур</button>
                <button class="flat-images-controls-button" @click="setActiveImageDisplay(2)" :class="{'active': selectedImageDisplayIndex == 2}">На этаже</button>
                <button class="flat-images-controls-button" @click="setActiveImageDisplay(3)" :class="{'active': selectedImageDisplayIndex == 3}">В корпусе</button>
                <button class="flat-images-controls-button" @click="setActiveImageDisplay(4)" :class="{'active': selectedImageDisplayIndex == 4}">На генплане</button>
            </div>
        </div>
        <div class="flats-details-info-main">
            <div class="flat-details-info-container">
            <div class="flat-details-info-header">
                <p class="flat-details-info-title">{{ flatData.Roominess }}-комнатная {{ flatData.Area }} м<sup>2</sup></p>
                <p class="flat-details-info-sub-title">{{ flatData.Price.toLocaleString("ru-RU")}} руб</p>
            </div>
            <div class="flat-details-info-inner">
                <details class="flat-details-info-sales" v-if="flatData.Sales.length > 0">
                    <summary>
                        <div class="summary-content">
                            <div class="summary-content-text">
                                <font-awesome-icon class="sales-icon" icon="fa-solid fa-gift" size="xl" />
                                <p>+{{flatData.Sales.length}} акция</p>
                            </div>
                            <font-awesome-icon icon="fa-solid fa-chevron-down" class="details-icon"></font-awesome-icon>
                        </div>   
                        </summary>
                            <div class="details-content">
                            <div class="details-content-item" v-for="(sale, index) in flatData.Sales" :key="index">
                                <p class="details-content-item-text">{{ sale.Title }}</p>
                            </div>
                        </div>
                        
                    </details>
                <div class="flat-details-info-ipoteca" @click="openConsultationDrawer">
                    <p>Ипотека</p>
                    <p class="ipoteca-text"> от {{Math.round(getIpoteca(flatData.Price)).toLocaleString("ru-RU")}} руб/мес</p>
                    <font-awesome-icon class="ipoteca-icon" icon="fa-solid fa-chevron-right"/>
                </div>
                
                <div class="flat-details-info-data-content">
                    <div class="flat-details-info-data">
                        <p class="flat-details-info-data-left">Номер квартиры</p>
                        <p class="flat-details-info-data-right">{{ flatData.Number }}</p>
                    </div>  
                    <div class="flat-details-info-data">
                        <p class="flat-details-info-data-left">Корпус</p>
                        <p class="flat-details-info-data-right">{{ flatData.Housing }}</p>
                    </div> 
                    <div class="flat-details-info-data">
                        <p class="flat-details-info-data-left">Секция</p>
                        <p class="flat-details-info-data-right">{{ flatData.Section }}</p>
                    </div> 
                    <div class="flat-details-info-data">
                        <p class="flat-details-info-data-left">Этаж</p>
                        <p class="flat-details-info-data-right">{{ flatData.Floor }}</p>
                    </div> 
                </div>  
                <div class="flat-details-info-additional">
                    <ul class="flat-details-info-controls">
                        <li class="flat-details-info-controls-item">
                            <button class="booking-button" @click="openConsultationDrawer">Забронировать</button>
                        </li>
                        <li>
                            <button class="button-icon">
                                <font-awesome-icon icon="fa-regular fa-heart"/>
                            </button>
                        </li>
                        <li>
                            <button class="button-call" @click="openConsultationDrawer">Заказать звонок</button>
                        </li>
                         <li>
                            <button class="button-icon">
                                <font-awesome-icon icon="fa-solid fa-share"/>
                            </button>
                        </li>
                         <li>
                            <button class="button-icon">
                                <font-awesome-icon icon="fa-solid fa-print"/>
                            </button>
                        </li>
                        
                    </ul>
                    </div>
                    <details class="flat-details-info-more">
                        <summary>
                            <div class="summary-content-more">
                            <div class="summary-content-text-more">
                                <p>Все характеристики</p>
                            </div>
                            <font-awesome-icon icon="fa-solid fa-chevron-down" class="details-icon-more"></font-awesome-icon>
                        </div>
                        </summary>                 
                        <div class="flat-details-info-data-bottom">
                        <p class="flat-details-info-data-left">Тип</p>
                        <p class="flat-details-info-data-right">{{ flatData.Type }}</p>
                    </div> 
                    </details>
            </div>
        </div>
        </div>
        
    </div>
</template>

<style scoped>

.flat-details-container {
    display: flex;
    width: 60%;
    min-width: calc(var(--ui-col) * 33);
    padding-left: 10px;
    padding-right: 10px;
}


.flat-images-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    position: relative;
    width: 70%;
    gap: 1rem;
    padding-top: 3rem;
}



.flat-image-inner {
    align-items: center;
    display: flex;
}

.flat-image-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flat-image {
   height: 30rem;
   max-width: 100%;
   object-fit: contain;
   border-radius: 1.5rem;
}

.floor-image {
    max-width: 70%;
    align-items: center;
    object-fit: contain;
}

.flats-details-info-main {
    margin-left: 5rem;
    width: 30rem;
}



.flat-details-info-container {
    display: flex;
    flex-direction: column;
    border: solid 1px var(--vt-c-white-blue);
    border-radius: 1.5rem;
    padding: 1rem 2rem;


    gap: 1rem;
    justify-content: space-between;
}

.flat-details-info-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.flat-details-info-inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.flat-details-info-data-content {
    display: flex;
    flex-direction: column;
}

.flat-details-info-data-content > *:last-child {
    border-bottom: none;
}

.flat-details-info-data, .flat-details-info-data-bottom {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px var(--vt-c-white-blue);
    height: 3rem;
    align-items: center;
}

.flat-details-info-data-bottom {
    padding-top: 2rem;
    padding-bottom: 2rem;
    border: none;
}


.flat-details-info-data-left {
    color: var(--vt-c-gray);
}

.flat-details-info-data-right {
    font-weight: 500;
}

.flat-details-info-title {
    font-size: var(--font-size-large);
    font-weight: 500;
    white-space: nowrap;
}

.flat-details-info-sub-title {
    font-size: var(--font-size-normal2);
    font-weight: 500;
    white-space: nowrap;
}

.flat-details-info-ipoteca {
    display: flex;
    gap: 0.5rem;
    background: var(--vt-c-white-blue2);
    height: 3rem;
    align-items: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-radius: 0.5rem;
    font-size: var(--font-size-mini);
  
}

.flat-details-info-ipoteca:hover .ipoteca-icon {
    transform: translateX(0.5rem);
}

.ipoteca-text {
    color: var(--vt-c-blue)
}

.ipoteca-icon {
    margin-left: auto;
    transition: transform 0.3s ease;
    font-size: var(--font-size-mini2);
    color: var(--vt-c-blue);
}

.flat-details-info-controls {
    display: grid;
    padding-left: 0;
    grid-template-columns: 4fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.8rem;
}

.flat-details-info-controls-item {
    height: 3rem;
    width: 100%;
}

.booking-button, .button-icon, .button-call {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.booking-button {
    background-color: var(--vt-c-blue);
    border-width: 0;
    border-radius: 0.5rem;
    color: var(--vt-c-white);
       transition: 0.3s;
}

.booking-button:hover {
    background-color: var(--vt-c-light-blue);
      transform: all 0.5 ease;
}

.button-icon, .button-call {
    border: solid 1px var(--vt-c-blue);
    background: transparent;
    color: var(--vt-c-blue);
    border-radius: 0.5rem;
    font-size: var(--font-size-normal2);
    transition: 0.3s;
}

.button-icon:hover, .button-call:hover {
    background: var(--vt-c-blue);
    color: var(--vt-c-white);
    transform: all 0.5 ease;
}

.button-call {
    font-size: var(--font-size-mini);
}

 .flat-details-info-controls-item:nth-child(1) {
        grid-column: span 2;
        object-fit: cover;
        object-position: center;
        width: 100%;
    }

.flat-details-info-controls li {
    list-style-type: none; 
    text-decoration: none;
}

.flat-images-controls {
    display: flex;
    gap: 0.5rem;
}

.flat-images-controls-button {
    margin-bottom: 1.5rem;
    height: 2.3rem;
    padding: 0 1.8rem;
    border-width: 0;
    border-radius: 1rem;
    background: var(--vt-c-white-blue2);
    font-size: var(--font-size-normal-mini);
    transition: 0.3s;
}

.flat-images-controls-button:hover {
    background: var(--vt-c-blue);
    color: var(--vt-c-white);
    transform: all 0.5 ease;
}

.flat-images-controls-button.active {
    background: var(--vt-c-blue);
    color: var(--vt-c-white)
}

.flat-images-controls-button.active:hover {
    background: var(--vt-c-light-blue);
    color: var(--vt-c-white)
}

.flat-details-info-sales summary {
    list-style: none;
}

.summary-content {
    display: flex;
    justify-content: space-between; 
    color:var(--vt-c-blue);
    transition: 0.3s;
    align-items: center;
}

.summary-content:hover {
    color:var(--vt-c-light-blue);
    transform: all 0.5 ease;
    cursor: pointer;
}

.summary-content-text {
    font-size: var(--font-size-normal-mini);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.sales-icon {
    font-size: var(--font-size-mini);
}

.flat-details-info-sales {
    border: solid 1px var(--vt-c-white-blue2);
    padding: 0.8rem 1.5rem;
    align-items: center;
    
}

.details-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;
}

.details-content-item {
    background-color: var(--vt-c-blue);
    color: var(--vt-c-white);
    font-size: var(--font-size-mini);
    border-radius: 0.5rem;
    width:max-content;
    padding: 0.2rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.flat-details-info-sales[open] .details-icon {
    transform: rotate(180deg);
}
.details-icon {
    transition: transform 0.2s ease;
    font-size: var(--font-size-mini2);
}

.flat-details-info-more  summary{
    list-style: none;
}

.summary-content-more {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: var(--vt-c-gray);
   
}

.summary-content-text-more {
     transition: 0.3s;
}

.summary-content-more:hover .summary-content-text-more {
    color: var(--vt-c-dark-indigo);
    transform: all 0.5 ease;
}

.details-icon-more {
    font-size: var(--font-size-mini2);
    color: var(--vt-c-blue);
    transition: 0.3s;
}


.flat-details-info-more[open] .details-icon-more {
    transform: rotate(180deg);
}


.img-full-size-container {
  
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

  .img-fill-size-inner {
    min-height: 100%;
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .floor-img-full-size {
        min-height: 50%;
        max-height: 50%;
  }

  .img-full-size, .img-full-size-borderless {
     border: solid 1px var(--vt-c-white-blue);
     border-radius: 1.5rem;
     padding: 1rem;
     height: 80%;
     display: flex;
     align-items: center;
  }
  .img-full-size-borderless {
     border: none !important;
  }
    .plan-img-full-size {
    height: 100%;
    display: flex;
    align-items: center;
}
  .plan-img-full-size img{
     height: 100%;
  }

  .img-full-size img {
    height: 80%;
  }
  

    .icon-bold {
       position: absolute;
       width: 2.5rem;
       height: 2.5rem;
  }

  .flat-image-container:hover .size-icon-container {
    display: flex;
  
    opacity: 1;
    z-index: 1;
    transform: all 0.5 easy;
  }

 .size-icon-container{
    position: absolute;
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

.v-enter-active{
    transition: all 0.2s ease-out;
    transition-delay: 0.1s; 
}

.v-leave-active {
    transition: all 0.3s ease-in;
}

.v-enter-from {
    transform: translateX(5px);
    opacity: 0;
}

.v-leave-to {
     transform: translateX(5px);
    opacity: 0;
}


.img-full-size-enter-active{
    transition: all 0.2s ease-out;
    transition-delay: 0.1s; 
}
.img-full-size-leave-active {
    transition: all 0.3s ease-in;
}

.img-full-size-enter-from {
    transform: translateY(100%);
}

.img-full-size-leave-to {
     transform: translateY(-100%);
}

@media (max-width: 900px) {
    .flat-details-container {
          min-width: 100%;
          gap: 2rem;
    }

    .flat-images-container {
        width: 100%;
    }

    .flat-images-controls {
        width: 100%;
        overflow: scroll;
        scrollbar-width: none; 
        -ms-overflow-style: none;
    }

    .flat-images-controls ::-webkit-scrollbar {
        display: none;
    }

    .flat-details-container {
        flex-direction: column;
    }

    .flat-details-info-container {
        width: 100%;
        margin: 0;
    }

    .flat-image-inner {
        width: 100%;
    }

    .flat-image {
        width: 100%;
        height: 100%;
    }

    .flat-images-container {
        padding: 0;
    }

    .flats-details-info-main {
        border-top: solid 1px var(--vt-c-white-blue);
        padding-top: 1.5rem;
        margin: 0;
        width: 100%;
    }

    .flat-details-info-title {
        font-size: var(--font-size-normal2);
    }
}
</style>