<script>

import architecture from './../../assets/images/features-slider/architecture.png'
import bulvar from './../../assets/images/features-slider/bulvar.png'
import holls from './../../assets/images/features-slider/holls.png'
import infrastructure from './../../assets/images/features-slider/infrastructure.png'
import yard from './../../assets/images/features-slider/yard.png'
import parking from './../../assets/images/features-slider/parking.png'

export default {
  data() {
    return{
      architectureImg: architecture,
      max_items: 6,
      max_visible_items: 4,
      progress_value: 1,
      currentIndex: 0,
      dragStartX: 0,
      offsetX : 0,
      isDragging: 0,
      bulvarImg: bulvar,
      images: { 0: {item: architecture}, 1: {item: bulvar}, 2: {item: holls}, 3: {item:parking}, 4: {item: infrastructure}, 5: {item: yard}}
    }
  },
  computed: {
    sliderItem() {
        const styles = {}
        for (const [id, img] of Object.entries(this.images)){
            styles[id] = {
                backgroundImage: `
                                linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
                                url('${img}')`
            }
        }
        return styles;
      }
    },
  methods: {
    next() {
      this.currentIndex = this.currentIndex < (this.max_items - this.max_visible_items) ? this.currentIndex += 1 : 0;
    },
    prev() {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex-=1 : this.currentIndex = this.max_items - this.max_visible_items;
    },
    handleDragStart(e) {
         console.log("dsadas")
        this.isDragging = true,
        this.dragStartX = e.clientX || e.touches[0].clientX
        this.offsetX = 0;
       
    },
    handleDragMove(e) {
        if(!this.isDragging) return;

        const dragX = e.clientX || e.touches[0].clientX;
        this.offsetX = dragX - this.dragStartX;

        const maxOffset = this.$refs.sliderWindow.offsetWidth / 2;
        if(Math.abs(this.offsetX) > maxOffset) {
            this.offsetX = this.offsetX > 0 ? maxOffset: -maxOffset;
        }
    },
    handleDragEnd() {
        if(!this.isDragging) return;
        this.isDragging = false;
        const theshold = this.$refs.sliderWindow.offsetWidth * 0.1;

        if(this.offsetX > theshold) {
            this.prev()
        }
        else if (this.offsetX < -theshold){
            this.next()
        }
        this.offsetX = 0
    }
  }
}
</script>

<template>
<div class="main">
    <div class="slider-header">
        <div class="slider-title">
            <p>
                Особенности проекта
            </p>
        </div>
        <div class="slider-controls">
            <button @click="prev">
                 <font-awesome-icon class="button-icon"  icon="fa-solid fa-chevron-left" />
            </button>
            <button  @click="next">
                  <font-awesome-icon class="button-icon"  icon="fa-solid fa-chevron-right" />
            </button >
        </div>
    </div>
    <div class="slider-container" @touchstart="handleDragStart" @touchmove="handleDragMove" @touchend="handleDragEnd"
                                    @mousedown="handleDragStart" @mousemove="handleDragMove" @mouseup="handleDragEnd" @mouseleave="handleDragEnd">
        <div class="slider" ref="sliderWindow">
        <div class="slider-inner" :style="{ transform: `translateX(-${currentIndex * (100 / max_visible_items)}%)`}">
        <div class="slider-item">
            <div class="slider-item-container">
                 <img class="slider-image" :src="images[0].item"/>
                <div class="slider-item-title-anim">
                    <div class="slider-item-title">
                        <p>Архетиктура: игра и формы цвета</p>
                    </div>
                    <div class="slider-item-description">
                        <p>«Голос Кашириных» меняет привычный облик северо-запада. Фасады домов индивидуальны и продуманы так, будто у каждого из них был свой архитектор.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider-item">
            <div class="slider-item-container" >
                <img class="slider-image" :src="images[1].item"/>
                <div class="slider-item-title-anim">
                    <div class="slider-item-title">
                        <p>Архетиктура: игра и формы цвета</p>
                    </div>
                    <div class="slider-item-description">
                        <p>«Голос Кашириных» меняет привычный облик северо-запада. Фасады домов индивидуальны и продуманы так, будто у каждого из них был свой архитектор.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider-item">
           <div class="slider-item-container" >
             <img class="slider-image" :src="images[2].item"/>
                <div class="slider-item-title-anim">
                    <div class="slider-item-title">
                        <p>Архетиктура: игра и формы цвета</p>
                    </div>
                    <div class="slider-item-description">
                        <p>«Голос Кашириных» меняет привычный облик северо-запада. Фасады домов индивидуальны и продуманы так, будто у каждого из них был свой архитектор.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider-item">
           <div class="slider-item-container">
             <img class="slider-image" :src="images[3].item"/>
                <div class="slider-item-title-anim">
                    <div class="slider-item-title">
                        <p>Архетиктура: игра и формы цвета</p>
                    </div>
                    <div class="slider-item-description">
                        <p>«Голос Кашириных» меняет привычный облик северо-запада. Фасады домов индивидуальны и продуманы так, будто у каждого из них был свой архитектор.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider-item">
          <div class="slider-item-container">
             <img class="slider-image" :src="images[4].item"/>
                <div class="slider-item-title-anim">
                    <div class="slider-item-title">
                        <p>Архетиктура: игра и формы цвета</p>
                    </div>
                    <div class="slider-item-description">
                        <p>«Голос Кашириных» меняет привычный облик северо-запада. Фасады домов индивидуальны и продуманы так, будто у каждого из них был свой архитектор.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider-item">
           <div class="slider-item-container">
             <img class="slider-image" :src="images[5].item"/>
                <div class="slider-item-title-anim">
                    <div class="slider-item-title">
                        <p>Архетиктура: игра и формы цвета</p>
                    </div>
                    <div class="slider-item-description">
                        <p>«Голос Кашириных» меняет привычный облик северо-запада. Фасады домов индивидуальны и продуманы так, будто у каждого из них был свой архитектор.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </div>
    </div>
    
</div>
</template>

<style scoped>

.main {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 100px;
    min-width: calc(var(--ui-col) * 33);
    width: 80%;
    display: flex;
    flex-direction: column;
}


.slider-container {
    width: 100%;
    display: flex;
    touch-action: pan-y;
}

.slider-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.slider {
  overflow: hidden;
  margin-top: 60px;
  
  border-radius: 20px;
  padding-bottom: 15px;
   user-select: none;
   flex-grow: 1;
  
}

.slider-title {
    font-weight: 500;
   font-size: var(--font-size-large2);
}

.slider-controls{
    display: flex;
    gap: 10px;
}

.slider-controls button {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    border-color:  var(--vt-c-blue);
    border-width: 1px;
    background: var(--vt-c-white);
    color: var(--vt-c-blue);
    transition: 0.2s;
}

.slider-controls button:hover {
    background: var(--vt-c-blue);
    color: var(--vt-c-white);
    transform: all 0.5 easy;
}


.slider-inner {
  display: flex;
  justify-content: space-between;
  transition: transform 0.5s ease;
  cursor: grab;
}

.slider-inner:first-child{
    padding-left: 0 !important;
}


.slider-inner:active {
    cursor: grabbing;
}

.slider-item {
  display: flex;
  color: var( --vt-c-blue);
  line-height: 1;
  flex-direction: column;
  justify-content: center;

  min-width: calc(100% / 4);
  font-weight:500;
  box-sizing: border-box;
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  
}

.slider-item-container {
    background-size: auto 100%;
    background-position: left;
    background-repeat: no-repeat;
    background-position: center;
    height: calc(var(--ui-unit) * 100);
    background-color: var(--vt-c-black);
    display: flex;
    align-items: center;
    justify-content: end;
    flex-direction: column;
    border-radius: 15px;
    width: 100%;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
   
}

.slider-item-title-anim{

    word-wrap: break-word;
    border-radius: 15px;
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
    color: var(--vt-c-white);
    transition: 0.3s;
    transform: translateY(100%) ;  
}

.slider-item-title {
    transition: 0.3s;
    padding-bottom: 40px;
    font-size: var(--font-size-normal4);
    transform: translateY(-100%);
}

.slider-item-description{
    color: var(--vt-c-middle-gray);
    font-size: var(--font-size-mini);
    padding-bottom: 40px;
  
}

.slider-item:hover .slider-item-title-anim,
.slider-item:hover .slider-item-title{
    transform: translateY(0);
}

.slider-item:hover .slider-item-container {
    background-size: auto 150%;
 }


.slider-item:hover .slider-image {
    scale: 1.2;
    transform: all 0.5 easy;
}

.slider-image {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    transition: 0.2s;
}

@media (max-width: 900px) {
    .main {
        min-width: 100%;
    }
    .slider-header{
        flex-direction: column;
    }
}

</style>