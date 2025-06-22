<script>
import flatsApiService from '@/services/flatsApiService'; 
import { RouterLink } from 'vue-router';
import cleaningAds from '@/assets/images/cleaning-ads.webp'
import cleaningAdsFull from '@/assets/images/cleaning-ads-full.webp'

export default {
    data() {
        return {
            flats: [],
            loading: false,
            cleaningAdsImg: cleaningAds,
            cleaningAdsImgFull: cleaningAdsFull,
            priceSort: 0,
            areaSort: 0,
            displayVariant: 0
        }
    },
    async created() {    
        this.loading = true;
        try{ 
            
        this.flats = await flatsApiService.getFlats()
        }
        catch(err){
            console.log(err)
        }
        finally{
            this.loading = false
        }
    },
    inject: ['openConsultationRequestDrawer'],
    methods: {
        getImage(path) {
                return `${path}`;
        },
        getIpoteca(price) {
            return (price - 900000) / (20 * 12);
        },
        openDrawer(){
            this.openConsultationRequestDrawer();
        },
        changePriceSort() {
            if(this.areaSort > 0) this.areaSort = 0;

            this.priceSort += 1;
            if(this.priceSort > 2) this.priceSort = 0;
        },
        changeAreaSort() {
             if(this.priceSort > 0) this.priceSort = 0;

            this.areaSort += 1;
            if(this.areaSort > 2) this.areaSort = 0;
        },
        changeDisplayVariant(variant) {
            if(variant == 0 || variant == 1){
                this.displayVariant = variant;
            }
        }
    }
}
</script>

<template>
    <div class="flats-catalog-main">
        <div class="flats-catalog-main-inner">
            <div class="flats-display-sort-controls">
            <div class="sort-controls">
                <div class="sort-title" >
                    <p>Сортировать по</p>
                </div>
                <div class="sort-direction">
                    <div class="sort-price" @click="changePriceSort">
                        <p class="sort-price-title" :class="{'active': priceSort > 0}">Стоимости</p>
                        <div class="sort-icons-container">
                            <font-awesome-icon class="sort-icon" icon="fa-solid fa-arrow-up-long" :class="{'active': priceSort == 1}"/>
                            <font-awesome-icon class="sort-icon" icon="fa-solid fa-arrow-down-long" :class="{'active': priceSort == 2}"/>
                        </div>

                    </div>
                    <div class="sort-area" @click="changeAreaSort">
                        <p class="sort-area-title" :class="{'active': areaSort > 0}">Площади</p>
                           <div class="sort-icons-container">
                            <font-awesome-icon class="sort-icon" icon="fa-solid fa-arrow-up-long" :class="{'active': areaSort == 1}"/>
                            <font-awesome-icon class="sort-icon" icon="fa-solid fa-arrow-down-long" :class="{'active': areaSort == 2}"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="display-controls">
                <div class="display-title">
                    <p>Вид отображения</p>
                </div>
                <div class="display-variant">
                    <div class="display-grid"  @click="changeDisplayVariant(0)">
                        <p class="display-grid-title"  :class="{'active': displayVariant == 0}">Карточки</p>
                        <font-awesome-icon class="display-icon" icon="fa-solid fa-table" :class="{'active': displayVariant == 0}"/>
                    </div>
                    <div class="display-list" @click="changeDisplayVariant(1)">
                        <p class="display-list-title"  :class="{'active': displayVariant == 1}">Список</p>
                        <font-awesome-icon class="display-icon" icon="fa-solid fa-list" :class="{'active': displayVariant == 1}"/>
                    </div>
                </div>
            </div>
        </div>
        <Transition mode="out-in">
        <div class="flats-catalog-container" :key="displayVariant">          
            <ul class="flats-catalog-inner-grid" v-if="displayVariant == 0">
                <li v-if="!loading" v-for="(flat, index) in flats.data.flats" :key="index"  class="flats-catalog-item-grid" >
                    <RouterLink to="/" class="flat-link-grid">
                        <div class="flats-catalog-item-grid-header">
                            <div class="flats-catalog-item-grid-header-top"> 
                                <div class="flat-number-grid">
                                    <p>№ {{flat.Number}}</p>
                                </div>
                                <div class="flat-item-controls">
                                    <font-awesome-icon class="icon" icon="fa-regular fa-heart" size="xl" />
                                    <font-awesome-icon class="icon" icon="fa-solid fa-ellipsis" size="xl" />
                                </div>
                           </div>
                            <div class="flats-catalog-item-grid-header-bottom">
                                <p>{{flat.Housing}}, Секция {{flat.Section}}, Этаж {{flat.Floor}}</p>
                            </div>
                        </div>
                        <div class="flats-catalog-item-grid-image">
                            <img :src="getImage(flat.Images[0].Path)"/>
                        </div>
                        <div class="flats-catalog-item-grid-footer">
                            <div class="flats-catalog-item-grid-footer-top">
                                <div class="flat-rooms-grid">
                                    <p>{{flat.Roominess}}-комнатная</p>
                                </div>
                                <div class="flat-area-grid">
                                    <p>{{flat.Area}} м<sup>2</sup></p>  
                                </div>
                            </div>
                            <div class="flats-catalog-item-grid-footer-bottom">
                                <div class="flat-price-grid">
                                    <p>{{flat.Price.toLocaleString("ru-RU")}} руб</p>
                                </div>
                                <div class="flat-ipoteca-grid">
                                    <p>В ипотеку от {{Math.round(getIpoteca(flat.Price)).toLocaleString("ru-RU")}} руб/мес</p>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </li>
                <li class="flats-catalog-item-grid static" v-if="!loading && flats.data.flats.length > 3" :style="{order: 4}" @click="openDrawer">
                    <div class="banner-grid">
                        <div class="banner-grid-inner">
                            <div class="banner-grid-title-container">
                            <div class="banner-grid-buttons">
                                <button class="witin-button">
                                    <font-awesome-icon icon="fa-solid fa-building" />
                                    <p>В квартирах от 40 кв. м.</p>
                                </button>
                                <button class="before-button">
                                    <font-awesome-icon icon="fa-solid fa-building" />
                                    <p>до 30 июня</p>
                                </button>
                            </div>
                            <div class="banner-grid-title">
                                <p>Предчистовая отделка</p>
                            </div>
                        </div>
                        <div class="banner-grid-button">
                                <p>Узнать подробнее</p>
                                <button class="learn-more-button">
                                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                                </button>
                        </div>   
                        </div> 
                          <div class="banner-grid-img-container">
                            <img :src="cleaningAdsImg" class="banner-grid-img"/>
                        </div>  
                    </div>
                </li>
            </ul> 
            <ul class="flats-catalog-inner-list" v-else-if="displayVariant == 1">
                <li v-if="!loading" v-for="(flat, index) in flats.data.flats" :key="index"  class="flats-catalog-item-list">
                    <RouterLink to="/" class="flat-link-link">
                        <div class="flat-number-list">
                                    <p>№ {{flat.Number}}</p>
                        </div>
                        <div class="flats-catalog-item-list-image">
                            <img :src="getImage(flat.Images[0].Path)"/>
                        </div>
                        <div class="flats-catalog-item-list-content">
                            <div class="flat-rooms-list">
                            <p>{{flat.Roominess}}-комнатная</p>
                         </div>
                         <div class="flat-area-list">
                            <p class="flat-area-list-title">Площадь</p>
                            <p class="flat-area-list-text">{{flat.Area}} м<sup>2</sup></p>  
                         </div>
                         <div class="flat-housing-list">
                            <p class="flat-housing-list-title">Корпус</p>
                            <p class="flat-housing-list-text">{{flat.Housing}}</p>  
                         </div>
                          <div class="flat-section-list">
                            <p class="flat-section-list-title">Секция</p>
                            <p class="flat-section-list-text">{{flat.Section}}</p>  
                         </div>
                           <div class="flat-floor-list">
                            <p class="flat-floor-list-title">Этаж</p>
                            <p class="flat-floor-list-text">{{flat.Floor}}</p>  
                         </div>
                          <div class="flats-catalog-item-list-price-container">
                                <div class="flat-price-list">
                                    <p>{{flat.Price.toLocaleString("ru-RU")}} руб</p>
                                </div>
                                <div class="flat-ipoteca-list">
                                    <p>В ипотеку от {{Math.round(getIpoteca(flat.Price)).toLocaleString("ru-RU")}} руб/мес</p>
                                </div>
                            </div>
                        </div>
                         <div class="flat-item-controls-list">
                             <font-awesome-icon class="icon" icon="fa-regular fa-heart" size="xl" />
                        </div>
                    </RouterLink>
                </li>
                <li class="flats-catalog-item-list static-list" v-if="!loading && flats.data.flats.length > 3" @click="openDrawer">
                    <div class="banner-list">              
                        <div class="banner-list-inner">
                            <div class="banner-list-title-container">
                                <div class="banner-list-buttons">
                                    <button class="witin-button">
                                        <font-awesome-icon icon="fa-solid fa-building" />
                                        <p>В квартирах от 40 кв. м.</p>
                                    </button>
                                    <button class="before-button">
                                        <font-awesome-icon icon="fa-solid fa-building" />
                                        <p>до 30 июня</p>
                                    </button>
                                </div>
                                <div class="banner-list-title">
                                    <p>Предчистовая отделка</p>
                                </div>
                            </div>
                            <div class="banner-list-button">
                                <p>Узнать подробнее</p>
                                <button class="learn-more-button">
                                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                                </button>
                            </div>   
                        </div> 
                        <div class="banner-list-img-container">
                            <img :src="cleaningAdsImgFull" class="banner-list-img"/>
                        </div> 
                    </div>
                </li> 
            </ul>  
        </div>
       </Transition>
        </div> 
    </div>
</template>

<style scoped>

.flats-catalog-main {
    background: var(--vt-c-white-blue2);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.flats-catalog-main-inner {
    width: 60%;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
    min-width: calc(var(--ui-col) * 33);
    gap: 2rem;
}

.flats-display-sort-controls {
    padding-top: 2rem;
    font-size: var(--font-size-normal-mini);
    color: var(--vt-c-gray);
    display: flex;
    width: 100%;
    justify-content: space-between;
}


.sort-controls, .display-controls {
    display: flex;
    gap: 5rem;
}

.sort-direction, .display-variant {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.sort-price, .sort-area, .display-grid, .display-list {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.sort-icons-container {
    font-size: var(--font-size-mini2);
}

.sort-icon, .display-icon {
    transition: 0.3s;
}

.sort-icon.active, .display-icon.active {
    color: var(--vt-c-blue);
    transform: all 0.5 ease;
}

.sort-price-title, .sort-area-title, .display-grid-title, .display-list-title {
    transition: 0.3s;
}

.sort-price-title:hover, .sort-area-title:hover, .display-list-title:hover, .display-grid-title:hover {
    color: var(--vt-c-dark-indigo);
    transform: all 0.5 ease;
}

.sort-price-title.active, .sort-area-title.active, .display-grid-title.active, .display-list-title.active {
    color: var(--vt-c-dark-indigo);
    transform: all 0.5 ease;
}

.flat-link-grid {
    width: 100%;
    height: 100%;
    padding: 2rem;
}

.flats-catalog-container {
   width: 100%;
}

.flats-catalog-inner-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  
     gap: 20px;
     padding-bottom: 10px;
     padding-left: 0;
}

.flats-catalog-item-grid, .flats-catalog-item-list {
    display: flex;
    text-decoration: none;
    position: relative;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    border-radius: 15px;
    background-color: var(--vt-c-white);
    transition: 0.2s;
    top:0;
}

.static {
    grid-row: 1;
    grid-column: 4;
    border-radius: 15px;
    position: relative;
}

.banner-grid {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;

}

.banner-grid-buttons {

    display:  flex;
    flex-direction: column;
    gap: 0.3rem;
}

.witin-button {
    padding: 1rem;
    font-size: var(--font-size-normal-mini);
    display: flex;
    gap: 0.5rem;
    color: var(--vt-c-white);
    align-items: center;
    background-color: var(--vt-c-blue);
    border: 0;
    height: 1.7rem;
    border-radius: 0.5rem;
    width: fit-content;
}

.before-button {
     padding: 1rem;
    font-size: var(--font-size-normal-mini);
    display: flex;
    gap: 0.5rem;
    color: var(--vt-c-blue);
    align-items: center;
    background-color: var(--vt-c-white);
    border: 0;
    height: 1.7rem;
    border-radius: 0.5rem;
    width: fit-content;
}

.banner-grid-button {
    display: flex;
    justify-content: space-between;
    color: var(--vt-c-light-gray2);
    font-size: var(--font-size-normal2);
    align-items: end;
}

.learn-more-button {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    border: 0;
    background-color: var(--vt-c-blue);
    color: var(--vt-c-white);
    transition: 0.2s;
}

.learn-more-button:hover {
    opacity: 0.8;
    transform: all 0.5 ease;
}

.banner-grid-title {
    font-size: var(--font-size-large);
    font-weight: 500;
    color: var(--vt-c-white);
}

.banner-grid-inner {
    padding: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1
}

.banner-grid-img-container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.banner-grid-img {
        filter: brightness(70%);
    border-radius: 15px;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.banner-grid-title-container {
    gap: 1rem;
    display: flex;
    flex-direction: column;
}

.flats-catalog-item-grid a {
    text-decoration: none;
}

.flats-catalog-item-grid:hover, .flats-catalog-item-list:hover  {
    top: -0.5rem;
    transform: top 0.5 ease;
}

.flat-item-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.2s;
}

.icon {
    transition: 0.2s;
}

.icon:hover {
    color: var(--vt-c-blue);
    transform: all 0.5 easy;
}

.flats-catalog-item-grid-header {
    
   display: flex;
   font-size: var(--font-size-mini);
   flex-direction: column; 
   gap: 10px;
   color: var(--vt-c-gray);
}

.flats-catalog-item-grid-header-top {
    display: flex;
    justify-content: space-between;
}
.flats-catalog-item-grid-header-bottom {
    display: flex;
}

.flats-catalog-item-grid-footer {
    color: var(--vt-c-dark-indigo);
   display: flex;
   flex-direction: column; 
   gap: 10px;
}

.flats-catalog-item-grid-footer-top {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px var(--vt-c-light-gray2);
  padding-bottom: 10px;
}



.flats-catalog-item-grid-footer-bottom {
    display: flex;
   flex-direction: column; 
}

.flat-number-grid {
    background: var(--vt-c-light-gray);
    padding: 5px;
  
    border-radius: 5px;
}

.flats-catalog-item-grid-image img {
    width: 100%;
    object-fit: cover;
    padding-bottom: 2rem;
}

.flat-price-grid {
    padding-top: 10px;
    font-size: var(--font-size-normal2);
    font-weight: 500;
}

.flat-ipoteca-grid {
    color: var(--vt-c-blue);
    font-size: var(--font-size-mini);
}





.flats-catalog-inner-list {
    display: grid;
    grid-template-columns: 100%;
     gap: 20px;
     padding-bottom: 10px;
     padding-left: 0;
}

.flat-link-link {
    padding: 20px;
    position: relative;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--vt-c-dark-indigo);
    gap: 2.5rem;
}
.flats-catalog-item-list-image img {
    width: 7rem;
    object-fit: cover;
}

.flats-catalog-item-list-content {
    display: flex;
    gap: 3rem;
}

.flat-number-list {
    position: absolute;
    top: 0;
    left: 0;
    background: var(--vt-c-light-gray);
    padding: 5px;
    color: var(--vt-c-gray);
    font-size: var(--font-size-mini);
    border-radius: 5px;
}

.flat-rooms-list {
    font-size: var(--font-size-normal2);
    font-weight: 500;
}

.flat-area-list, .flat-housing-list, .flat-section-list, .flat-floor-list {
    display: flex;
    flex-direction: column;
}

.flat-floor-list {
    padding-right: 4rem;
    border-right: solid 1px var(--vt-c-light-gray2);
}

.flat-area-list-title, .flat-housing-list-title, .flat-section-list-title, .flat-floor-list-title {
    font-size: var(--font-size-mini);
    color: var(--vt-c-gray);
}

.flat-area-list-text, .flat-housing-list-text, .flat-section-list-text, .flat-floor-list-text  {
    font-weight: 500;
}

.flats-catalog-item-list-price-container {
    display: flex;
    flex-direction: column;
}

.flat-price-list {
    font-size: var(--font-size-normal2);
    font-weight: 500;
}

.flat-ipoteca-list {
    font-size: var(--font-size-mini);
    color: var(--vt-c-blue)
}

.flat-item-controls-list {
    margin-left: auto;
    color: var(--vt-c-gray);
}

.static-list {
     grid-row: 4;
     grid-column: 1;
}

.banner-list {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    justify-content: space-between;
}

.banner-list-img-container{
    position: absolute;
    width: 100%;
    height: 100%;
}

.banner-list-img {
    filter: brightness(70%);
    border-radius: 15px;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.banner-list-inner {
    z-index: 100;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 2rem;
}

.banner-list-title-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.banner-list-title {
    font-size: var(--font-size-large);
    color: var(--vt-c-white);
    font-weight: 500;
}

.banner-list-buttons {
    display: flex;
    gap: 0.5rem;
}

.banner-list-button {
    display: flex;
    color: var(--vt-c-light-gray2);
    font-size: var(--font-size-normal2);
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
}


.v-enter-active{
    transition: all 0.2s ease-out;
    transition-delay: 0.1s; 
}

.v-leave-active {
    transition: all 0.3s ease-in;
}

.v-enter-from {
    transform: translateY(5px);
    opacity: 0;
}

.v-leave-to {
     transform: translateY(5px);
    opacity: 0;
}


@media (max-width: 900px) {
    .flats-catalog-inner-grid {
        grid-template-columns: repeat(1, 1fr) !important; 
        display: grid !important;
    }

    .static {
        grid-row: 4;
        grid-column: 1;
    }

    .flats-catalog-item-grid-image img{
        
    }
    .flat-link-grid {
        
    }

    .flats-display-sort-controls {
        display: none;
    }

    .flats-catalog-main-inner {
        min-width: 100%;
    }
}

</style>