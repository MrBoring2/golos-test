<script>

import { RouterLink } from 'vue-router'

export default {
  props:
    {
       maxVisibleItems: {
        type: Number,
        required: true,
       },
       minVisibleItems: {
        type: Number,
        default: 1
       },
       title: {
        type: String,
        required: true
       },
       content: {
        type: Array,
        required: true
       },
       canOpenConsultationDrawer: {
        type: Boolean,
        default: false
       }

    }
  ,
  data() {
    return{
      max_items: this.content.length,
      max_visible_items: 4,
      currentVisibleItems: this.max_visible_items,
      min_visible_items: 1,
      progress_value: 1,
      currentIndex: 0,
      dragStartX: 0,
      offsetX : 0,
      isDragging: 0,
      isDragged: false,
      preventHref: false,
      mediaQuery: null
    }
  },
  mounted() {
    //не знаю, вредит ли
    this.mediaQuery = window.matchMedia("(max-width: 900px)");
    const handleMediaChange = (e) => {
        this.currentVisibleItems = e.matches == true ? this.min_visible_items : this.max_visible_items
        if(e.matches == false){
            this.currentIndex = 0;
        }
    }
    
    handleMediaChange(this.mediaQuery);
    this.mediaQuery.addListener(handleMediaChange);
  },
  beforeDestroy() {
    if (this.mediaQuery) {
      this.mediaQuery.removeListener(handleMediaChange);
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
      inject: ['openConsultationRequestDrawer'],
  methods: {
    next() {
      this.currentIndex = this.currentIndex < (this.max_items - this.currentVisibleItems) ? this.currentIndex += 1 : 0;
    },
    prev() {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex-=1 : this.currentIndex = this.max_items - this.currentVisibleItems;
    },
    handleDragStart(e) {
      
        this.isDragging = true,
        this.dragStartX = e.clientX || e.touches[0].clientX
        this.offsetX = 0;
 
    },
    handleDragMove(e) {
        if(!this.isDragging) return;
        this.isDragged = true;
        const dragX = e.clientX || e.touches[0].clientX;
        this.offsetX = dragX - this.dragStartX;

        const maxOffset = this.$refs.sliderWindow.offsetWidth / 2;
        if(Math.abs(this.offsetX) > maxOffset) {
            this.offsetX = this.offsetX > 0 ? maxOffset: -maxOffset;
        }
        this.preventHref = true;
       

            
    },
    handleDragEnd(e) {
        if(!this.isDragging) return;
        

        this.isDragging = false;
        const theshold = this.$refs.sliderWindow.offsetWidth * 0.1;

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
    navigate(href, targetBlank){
        let target = '';
        if(targetBlank) target = '_blank'
        else target = '_self'

        if(!this.preventHref && href != null) {
            window.open(href, target)
        }
    },
    openDrawer() {
        if(!this.preventHref)
            this.openConsultationRequestDrawer();
    }
  }
}
</script>

<template>
<div class="slider-container">
    <div class="slider-header">
        <div class="slider-title">
            <p>
                {{title}}
            </p>
        </div>
        <div class="slider-controls" v-if="max_items > currentVisibleItems">
            <button @click="prev">
                 <font-awesome-icon class="button-icon"  icon="fa-solid fa-chevron-left" />
            </button>
            <button  @click="next">
                  <font-awesome-icon class="button-icon"  icon="fa-solid fa-chevron-right" />
            </button >
        </div>
    </div>
    <div class="slider-content" @touchstart="handleDragStart" @touchmove="handleDragMove" @touchend="handleDragEnd"
                                    @mousedown="handleDragStart" @mousemove="handleDragMove" @mouseup="handleDragEnd" @mouseleave="handleDragEnd" >
        <div class="slider" ref="sliderWindow">
           <Transition>
            <div class="silder-item-icon-container" v-if="!isDragged">
                <div class="silder-item-icon-container-inner">
                    <font-awesome-icon class="silder-item-icon" icon="fa-solid fa-arrows-h"/>
                </div>
            </div>
            </Transition>
            
            <div class="slider-inner" :style="{ transform: `translateX(-${currentIndex * (100 / currentVisibleItems)}%)`}">
            <div class="slider-item" v-for="(slide, index) in content" :key="index" @click="canOpenConsultationDrawer ? openDrawer() : navigate(slide.href, true)">      
                <div class="slider-item-container">
                <img class="slider-image" :src="slide.image"/>
                <div class="slider-item-title-anim">
                    <div class="slider-item-title">
                        <p>{{slide.title}}</p>
                    </div>
                    <div class="slider-item-description">
                        <p>{{slide.description}}</p>
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

.slider-container {
    padding-left: 10px;
    padding-right: 10px;
    min-width: calc(var(--ui-col) * 33);
    width: 80%;
    gap: 40px;
    display: flex;
    flex-direction: column;
}

.slider-content {
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
  position: relative;
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

.silder-item-icon-container {
    position: fixed;
   position: absolute;
   right: 0;
   top: 45%;
   z-index: 1000;
   display: flex;
   flex-direction: column;
   align-items: center;
   display: none;  
}

.silder-item-icon-container-inner {
    background-color: var(--vt-c-blue);
    width: 50px;
    height: 50px;   
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.silder-item-icon {
    font-size: var(--font-size-normal4);
    color: var(--vt-c-white);
    animation: updown 2s ease infinite;
}

@keyframes updown {
  0% {
    transform: translateX(-30%);
  }

  50% {
    transform: translateX(30%);
  }

  100% {
    transform: translateX(-30%);
  }
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

.disable-href {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    pointer-events: none;
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
    color: var(--vt-c-light-gray2);
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
    transform: all 0.3 easy;
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
    opacity: 0.8;
}

.slider-item-link {
    text-decoration: none;
     -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
      display: inline-block;
}
 .v-enter-active{
   transition: all 0.2s ease-out;
    }

  .v-leave-active {
   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .v-enter-from, .v-enter, .v-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }

@media (max-width: 900px) {

    .slider-container {
        min-width: 100%;
        gap: 10px;
    }
    .slider-header{
       justify-content: space-between;
        align-items: center;
        gap: 1px;
    }

    .slider {
        margin-top: 10px;
    }
    
    .slider-title {
         color: var(--vt-c-dark-indigo);
        font-size: var(--font-size-normal3);
        
    }
 
    .silder-item-icon-container {
        display: block;
    }
    .slider-controls {
        justify-content: end;
        margin-right: 10px;
    }

    .slider-controls button {
        width: 40px;
        height: 40px;
    }

    .slider-item {
        min-width: 100%;
    }
    .slider-item-title-anim, .slider-item-title {
        transform: translateY(0%) ;
    }
}

</style>