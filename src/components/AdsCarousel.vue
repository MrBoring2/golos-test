<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return{
      max_index: 2,
      progress_value: 1,
      currentIndex: 0
    }
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex += 1) % 3;
      this.progress_value = this.currentIndex + 1;
      console.log('Next clicked', this.currentIndex);
    },
    prev() {

      this.currentIndex = (this.currentIndex - 1 + 3) % 3;

      this.progress_value = this.currentIndex + 1;

      console.log('Prev clicked', this.currentIndex);
    }
  }
}
</script>
<template>
    <div class="ads-carousel">
          <div class="ads-carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="ads-carousel-item">
              <p>Удвоим материнский капитал</p>
                <RouterLink class="ads-carousel-item-more">
                  <p>Подробнее</p>
                  <font-awesome-icon class="ads-carousel-item-icon" icon="fa-solid fa-chevron-right" />
                </RouterLink>
            </div>
            <div class="ads-carousel-item">
              <p>Скидска 10% на квартиры</p>
              <RouterLink class="ads-carousel-item-more">
                  <p>Подробнее</p>
                  <font-awesome-icon class="ads-carousel-item-icon" icon="fa-solid fa-chevron-right" />
                </RouterLink>
            </div>
            <div class="ads-carousel-item">
              <p>Семейная ипотека 3.5% на весь срок</p>
              <RouterLink class="ads-carousel-item-more">
                  <p>Подробнее</p>
                  <font-awesome-icon class="ads-carousel-item-icon" icon="fa-solid fa-chevron-right" />
                </RouterLink>
            </div>
          </div>
          <div class="ads-carousel-controls">
            <div>
            <button @click="prev">
              <font-awesome-icon class="ads-carousel-button-icon"  icon="fa-solid fa-chevron-left" />
            </button>
            <button @click="next">
              <font-awesome-icon class="ads-carousel-button-icon"  icon="fa-solid fa-chevron-right" />
            </button>
            </div>
            <progress class="progress-bar" max="3" :value=progress_value ></progress>
            <div class="index-number">0{{currentIndex + 1}} | 0{{max_index + 1}}</div>
          </div>
    </div>
</template>

<style scoped>
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



  .ads-carousel {
    position: relative;
    overflow: hidden;
    margin-top: 60px;
    margin-right: 10px;
    background-color: var( --vt-c-blue);
    border-radius: 20px;
    width: 400px;
    padding-bottom: 15px;
  }

  .ads-carousel-item {
    display: flex;
    color: var( --vt-c-white);
    font-size: var(--font-size-large3);
    line-height: 1;
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

.ads-carousel-item a {
  text-decoration: none;
  color: var(--vt-c-light-blue-lighter);
}

.ads-carousel-item-more {
  font-size: var(--font-size-mini);
  display: flex;
  align-items: center;
  transition: 0.2s;
}
.ads-carousel-item-more:hover{
  color: var( --vt-c-white);
  transform: all 0.5 easy;
}



.ads-carousel-item-icon {
  margin-left: 10px;
  font-size: var(--font-size-micro);
}

.ads-carousel-button-icon {
   color: var( --vt-c-white);
    transition: 0.2s;
}

  .ads-carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
}

.ads-carousel-controls {
  padding: 0 20px;
  color: var( --vt-c-white);
  font-size: var(--font-size-mini);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}



.ads-carousel-controls button {
  background-color: transparent;
  border-width: 0;
  transition: 0.2s;
}

.ads-carousel-controls button:hover .ads-carousel-button-icon{
   transform: all 0.5 easy;
   color: var(--vt-c-dark-purple);
}

.ads {
    margin-top: 60px;
    background-color: var( --vt-c-blue);
    border-radius: 20px;
    width: 400px;
    height: 250px;
  }
</style>