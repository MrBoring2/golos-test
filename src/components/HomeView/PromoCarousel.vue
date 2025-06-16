<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return{
      max_index: 2,
      progress_value: 1,
      currentIndex: 0,
      dragStartX: 0,
      offsetX : 0,
      isDragging: 0,
    }
  },
  inject: ['openConsultationRequestDrawer'],
  methods: {
    next() {
      this.currentIndex = (this.currentIndex += 1) % 3;
      this.progress_value = this.currentIndex + 1;
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + 3) % 3;
      this.progress_value = this.currentIndex + 1;
    },
    handleDragStart(e) {
      
        this.isDragging = true,
        this.dragStartX = e.clientX || e.touches[0].clientX
        this.offsetX = 0;
 
    },
    handleDragMove(e) {
        if(!this.isDragging) return;
        
        const dragX = e.clientX || e.touches[0].clientX;
        this.offsetX = dragX - this.dragStartX;

        const maxOffset = this.$refs.carouselWindow.offsetWidth / 2;
        if(Math.abs(this.offsetX) > maxOffset) {
            this.offsetX = this.offsetX > 0 ? maxOffset: -maxOffset;
        }
        this.preventHref = true;
       

            
    },
    handleDragEnd(e) {
        if(!this.isDragging) return;
        

        this.isDragging = false;
        const theshold = this.$refs.carouselWindow.offsetWidth * 0.1;

        if(this.offsetX > theshold) {
            this.prev()
        }
        else if (this.offsetX < -theshold){
            this.next()
        }
        if(this.offsetX != 0){
              this.preventHref = true;
        }
        else {
              this.preventHref = false;
        }

        this.offsetX = 0;
          
    },
    openDrawer() {
      this.openConsultationRequestDrawer();
    }
  }
}
</script>
<template>
  <div class="promo-carousel">
    <div class="promo-carousel-inner" ref="carouselWindow" :style="{ transform: `translateX(-${currentIndex * 100}%)` }" @touchstart="handleDragStart" @touchmove="handleDragMove" @touchend="handleDragEnd"
                                    @mousedown="handleDragStart" @mousemove="handleDragMove" @mouseup="handleDragEnd" @mouseleave="handleDragEnd" >
      <div class="promo-carousel-item">
        <p class="promo-acousel-item-title">Удвоим материнский капитал</p>
        <RouterLink  to="/" class="promo-carousel-item-more">
          <p>Подробнее</p>
            
        </RouterLink>
      </div>
      <div class="promo-carousel-item">
        <p class="promo-acousel-item-title">Скидска 10% на квартиры</p>
        <RouterLink  to="/" class="promo-carousel-item-more" @click="openDrawer">
          <p>Узнать подробнее</p>
          <font-awesome-icon class="promo-carousel-item-icon" icon="fa-solid fa-chevron-right" />
        </RouterLink>
      </div>
      <div class="promo-carousel-item">
        <p class="promo-acousel-item-title">Семейная ипотека 3.5% на весь срок</p>
        <RouterLink to="/" class="promo-carousel-item-more" @click="openDrawer">
          <p>Узнать подробнее</p>
          <font-awesome-icon class="promo-carousel-item-icon" icon="fa-solid fa-chevron-right" />
        </RouterLink>
      </div>
    </div>
    <div class="promo-carousel-controls">
      <div>
        <button @click="prev">
          <font-awesome-icon class="promo-carousel-button-icon"  icon="fa-solid fa-chevron-left" />
        </button>
        <button @click="next">
          <font-awesome-icon class="promo-carousel-button-icon"  icon="fa-solid fa-chevron-right" />
        </button>
      </div>
      <progress class="progress-bar" max="3" :value=progress_value ></progress>
      <div class="index-number">0{{currentIndex + 1}} | 0{{max_index + 1}}</div>
    </div>
  </div>
</template>

<style scoped>

.promo-carousel {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  margin-right: 10px;
  background-color: var( --vt-c-blue);
  border-radius: 20px;
  width: 20rem;
  padding-bottom: 15px;
}

.promo-carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
}

.promo-carousel-item {
  display: flex;
  color: var( --vt-c-white);
 
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  min-width: 100%;
  padding: 20px;
  gap: 20px;
  font-weight:500;
  box-sizing: border-box;
  text-align: left;
}

.promo-acousel-item-title {
  font-size: var(--font-size-large);
  line-height: 1;
}

.promo-carousel-item a {
  text-decoration: none;
  color: var(--vt-c-light-blue-lighter);
}

.promo-carousel-item-more {
  font-size: var(--font-size-mini);
  display: flex;
  align-items: center;
  transition: 0.2s;
}
.promo-carousel-item-more:hover{
  color: var( --vt-c-white);
  transform: all 0.5 easy;
}

.promo-carousel-item-icon {
  margin-left: 10px;
  font-size: var(--font-size-micro);
}

.promo-carousel-controls {
  padding: 0 20px;
  color: var( --vt-c-white);
  font-size: var(--font-size-mini);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.promo-carousel-controls button {
  background-color: transparent;
    font-size: var(--font-size-mini);
  border-width: 0;
  transition: 0.2s;
}

.promo-carousel-button-icon {
  color: var( --vt-c-white);
  transition: 0.2s;
}

.promo-carousel-controls button:hover .promo-carousel-button-icon{
  transform: all 0.5 easy;
  color: var(--vt-c-dark-purple);
}


.progress-bar {
  width: 70%;
  height: 2px;
  -webkit-appearance: none;
  appearance: none;
}

.progress-bar::-webkit-progress-bar {
  background: var(--vt-c-light-blue-lighter);
  border-radius: 3px;
}

.progress-bar::-webkit-progress-value {
  background: var(--vt-c-white);
  border-radius: 3px;
  transition: width 0.5s ease;
}

 .index-number {
  line-height: 1;
  text-align: center;
}

@media (max-width: 900px) {
  .promo-carousel {
    width: 100%;
    border-radius: 0;
    margin: 0;
    gap: 20px;
  }

  .promo-carousel-item {
    padding: 15 25px;
  }

  .promo-carousel-controls {
    flex-flow: column-reverse;
    gap:10px;
    padding: 15px;
  }

  .promo-acousel-item-title {
    font-size: var(--font-size-normal2);
  }
}
</style>