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
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + 3) % 3;
      this.progress_value = this.currentIndex + 1;
    }
  }
}
</script>
<template>
  <div class="promo-carousel">
    <div class="promo-carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="promo-carousel-item">
        <p>Удвоим материнский капитал</p>
        <RouterLink  to="/" class="promo-carousel-item-more">
          <p>Подробнее</p>
          <font-awesome-icon class="promo-carousel-item-icon" icon="fa-solid fa-chevron-right" />
        </RouterLink>
      </div>
      <div class="promo-carousel-item">
        <p>Скидска 10% на квартиры</p>
        <RouterLink  to="/" class="promo-carousel-item-more">
          <p>Подробнее</p>
          <font-awesome-icon class="promo-carousel-item-icon" icon="fa-solid fa-chevron-right" />
        </RouterLink>
      </div>
      <div class="promo-carousel-item">
        <p>Семейная ипотека 3.5% на весь срок</p>
        <RouterLink  class="promo-carousel-item-more">
          <p>Подробнее</p>
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
  position: relative;
  overflow: hidden;
  margin-top: 60px;
  margin-right: 10px;
  background-color: var( --vt-c-blue);
  border-radius: 20px;
  width: 400px;
  padding-bottom: 15px;
}

.promo-carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
}

.promo-carousel-item {
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
</style>