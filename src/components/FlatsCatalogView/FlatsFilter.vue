<script>
import { RouterLink } from 'vue-router';
import DoubleRangeInput from '../DoubleRangeInput.vue';
export default {
    data() {
        return {
            values: {
            minPrice: this.filteredBoundaryValues.minPrice,
            maxPrice: this.filteredBoundaryValues.maxPrice,
            minArea: this.filteredBoundaryValues.minArea,
            maxArea: this.filteredBoundaryValues.maxArea,
            minFloor: this.filteredBoundaryValues.minFloor,
            maxFloor: this.filteredBoundaryValues.maxFloor,
            selectedRooms: [],
            rooms: this.filteredBoundaryValues.rooms,
            activePrice: false,
            activeFloor: false,
            activeArea: false,
            },
            selectedSale: null,
            totalItems: this.filteredBoundaryValues.totalItems,
            currentFilter: {},
            
        }
    },
    watch: {
        filteredBoundaryValues(newVal) {
            console.log('currentfilter')
            console.log(this.currentFilter)

     
            console.log('newVal')
            console.log(newVal)
             this.totalItems = newVal.totalItems
             this.values.minPrice = this.currentFilter.minPrice == undefined && newVal.minPrice != undefined ? newVal.minPrice : this.values.minPrice;
             this.values.maxPrice = this.currentFilter.maxPrice == undefined && newVal.maxPrice != undefined ? newVal.maxPrice : this.values.maxPrice;
             this.values.minArea = this.currentFilter.minArea == undefined && newVal.minArea != undefined ? newVal.minArea  : this.values.minArea;
             this.values.maxArea = this.currentFilter.maxArea == undefined && newVal.maxArea != undefined ? newVal.maxArea : this.values.maxArea;
             this.values.minFloor =this.currentFilter.minFloor == undefined && newVal.minFloor != undefined ? newVal.minFloor : this.values.minFloor;
             this.values.maxFloor = this.currentFilter.maxFloor == undefined && newVal.maxFloor != undefined ? newVal.maxFloor : this.values.maxFloor;
             if(isNaN(this.values.minArea)) this.values.minArea = Math.floor(this.boundaryValues.minArea);
             if(isNaN(this.values.maxArea))  this.values.maxArea = Math.ceil(this.boundaryValues.maxArea);
   // console.log(this.currentFilter)

        },
        selectedSale(newVal, oldVal) {
            if (oldVal !== null && newVal === null) {
                if (this.currentFilter.sales.includes(oldVal)) {
                this.currentFilter.sales = this.currentFilter.sales.filter(r => r !== oldVal);
               
                this.updateFilter('', '')
                }
            }
        }
    },
    computed: {
        
        selectedSort: {
                get() {
                    if(!this.sort.type) return 'null';
                    return `${this.sort.type}_${this.sort.direction}`;
                },
                set(value) {
                    if(this.sort != value) {
                        if(value == 'null') {
                            this.$emit('update-sort', {type: null, direction: null})
                        }
                      
                        const [type, direction] = value.split('_');
                        this.$emit('update-sort', {type, direction})
                    }
                }
            },
        selectedDisplayMode: {
            get() {
                    if(!this.displayMode) return 'grid';
                    return `${this.displayMode}`;
                },
                set(value) {
                    if(this.displayMode != value) {
                        this.$emit('update-display-mode', value)
                    }
                }
        }
    },
    
    methods: {
         updatePriceRange(newValues) {
            console.log('updated')
            if (Array.isArray(newValues)) {
                this.values.minPrice = newValues[0];
                this.values.maxPrice = newValues[1];
        }
        },
        updateAreaRange(newValues) {
            if (Array.isArray(newValues)) {
                this.values.minArea = newValues[0];
                this.values.maxArea = newValues[1];
            }
        },
        updateFloorRange(newValues) {
            if (Array.isArray(newValues)) {
                this.values.minFloor = newValues[0];
                this.values.maxFloor = newValues[1];
            }
        },
        updateFilter(index, type){

            if(type == 'price') {this.activePrice = true; this.activeFloor = false; this.activeArea = false}
            if(type == 'floor') {this.activePrice = false; this.activeFloor = true; this.activeArea = false}
            if(type == 'area') {this.activePrice = false; this.activeFloor = false; this.activeArea = true}

           
            this.currentFilter[`${index}${type.charAt(0).toUpperCase() + type.slice(1)}`] = this.values[`${index}${type.charAt(0).toUpperCase() + type.slice(1)}`]
          
         
            console.log('sales')
            console.log(this.currentFilter)
            this.$emit('update-filter', this.currentFilter)
        },
        deselect(value) {
               console.log('Выбор очищен крестиком');
            if (value === null || value.length === 0) {
            console.log('Выбор очищен крестиком');
            }
        },
        handleSelectSale(value) {
            console.log('sssselecte')
            if(this.currentFilter.sales == undefined)
                this.currentFilter.sales = []
            if (this.currentFilter.sales.includes(this.selectedSale)) {
                this.currentFilter.sales = this.currentFilter.sales.filter(r => r !== this.selectedSale);
            } else {
                this.currentFilter.sales.push(this.selectedSale);
            }
            console.log(this.currentFilter)
            this.updateFilter('', '');
        },
        declineObject(count) {
            const lastTwo = count % 100;
            const lastDigin = count % 10;

            if(lastTwo >= 11 && lastTwo <= 19)
                return 'ов';
            else if(lastDigin == 1) {
                return '';
            }
            else if (lastDigin >= 2 && lastDigin <= 4) {
                return 'а';
            }
            else return 'ов'
        },
        dropFilters() {
            console.log('drop')
            this.values.minPrice = this.boundaryValues.minPrice,
            this.values.maxPrice = this.boundaryValues.maxPrice,
            this.values.minFloor = this.boundaryValues.minFloor,
            this.values.maxFloor = this.boundaryValues.maxFloor,
            this.values.minArea = Math.floor(this.boundaryValues.minArea),
            this.values.maxArea = Math.ceil(this.boundaryValues.maxArea)
            this.values.selectedRooms = []
            this.currentFilter = {}
            this.selectedSale = null
            this.updateFilter('', '')
        },
        toggleRoom(room) {
        if (this.values.selectedRooms.includes(room)) {
            this.values.selectedRooms = this.values.selectedRooms.filter(r => r !== room);
        } else {
            this.values.selectedRooms.push(room);
        }
          this.currentFilter['rooms'] = this.values.selectedRooms;
          this.updateFilter("", "")
    }
    },
    props: ['sort', 'displayMode', 'boundaryValues', 'filteredBoundaryValues', 'sales'],
    components: {
        DoubleRangeInput
    },
    mounted() {
      console.log(this.sales)
    }
}

</script>

<template>
    <div class="flats-filter-container">
        <div class="flats-filter-title">
            <p>Подбор по параметрам</p>
        </div>
        <div class="flats-filter-desktop">
            <div class="rooms-select-container">
                <div class="rooms-select-title">
                    <p>Комнатность</p>
                </div>
                <div class="rooms-select-inner">
                    <button class="rooms-select" :disabled="!values.rooms.includes(1)" @click="toggleRoom(1)" :class="{'active': values.selectedRooms.includes(1)}">
                        <p>1</p>
                    </button>
                    <button class="rooms-select" :disabled="!values.rooms.includes(2)" @click="toggleRoom(2)" :class="{'active': values.selectedRooms.includes(2)}">
                        <p>2</p>
                    </button>
                    <button class="rooms-select" :disabled="!values.rooms.includes(3)" @click="toggleRoom(3)" :class="{'active': values.selectedRooms.includes(3)}">
                        <p>3</p>
                    </button>
                    <button class="rooms-select" :disabled="!values.rooms.includes(4)" @click="toggleRoom(4)" :class="{'active': values.selectedRooms.includes(4)}">
                        <p>4+</p>
                    </button>
                </div>
            </div>
            <DoubleRangeInput  class="range-input" @drag-end="updateFilter($event, 'price')"
                :min="boundaryValues.minPrice" 
                :max="boundaryValues.maxPrice"
                :value="[values.minPrice, values.maxPrice]"
                @input="updatePriceRange" title="Стоимость, ₽" @update-input="updateFilter"
            />
            <DoubleRangeInput class="range-input" @drag-end="updateFilter($event, 'area')"
                :min="Math.floor(boundaryValues.minArea)"
                :max="Math.ceil(boundaryValues.maxArea)" 
                :value="[values.minArea, values.maxArea]"
                @input="updateAreaRange" title="Площадь, м²" @update-input="updateFilter"
            />
            <DoubleRangeInput class="range-input" @drag-end="updateFilter($event, 'floor')"
                :min="boundaryValues.minFloor" clickable="false"  
                :max="boundaryValues.maxFloor"
                :value="[values.minFloor, values.maxFloor]"
                @input="updateFloorRange" title="Этаж" @update-input="updateFilter"
            />
        </div>
        <div class="sub-filter-info-container">
                  <details class="custom-details">
                      <summary class="custom-details-summary">
                        <span class="summary-text">Расширенный фильтр</span>
                       <font-awesome-icon icon="fa-solid fa-chevron-down" class="details-icon"></font-awesome-icon>
                       </summary>
                      <div class="details-content">
                        <v-select class="custom-multiselect" v-model="selectedSale" @input="deselect" @option:selected="handleSelectSale" @option:deselected="deselect" :options="sales.map(sale => sale.Title)"/>
                    </div>
                </details>
            <RouterLink :to="{path: '/flats', hash: '#flats-catalog'}" class="watch-flats-href">Смотреть {{totalItems}} объект{{declineObject(totalItems)}}</RouterLink>
            <button class="drop-filters-button" @click="dropFilters">
                <p>Сбросить фильтры</p>
                <font-awesome-icon class="drop-filter-icon" icon="fa-solid fa-close" size="xl"/> 
            </button>
        </div>
        <div class="flats-filter-mobile">
            <button class="flats-filter-mobile-button">
                <font-awesome-icon icon="fa-solid fa-filter" />
                <p>Фильтр</p>
            </button>
            <div class="flats-filter-mobile-controls">
                <div class="flats-filter-mobile-control-inner">
                    <button class="flats-filter-mobile-control-icon">
                         <div class="sort-icons-container">
                            <font-awesome-icon class="icon" icon="fa-solid fa-arrow-up-long" :class="{'active': this.sort.direction == 'asc'}"/>
                            <font-awesome-icon class="icon" icon="fa-solid fa-arrow-down-long" :class="{'active': this.sort.direction == 'desc'}"/>
                        </div>
                    </button>
                    <select v-model="selectedSort" class="flats-filter-moblie-select">
                        <option value="null">По умолчанию</option>
                        <option value="price_asc">По увеличению цены</option>
                        <option value="price_desc">По убыванию цены</option>
                        <option value="area_asc">По увеличению площади</option>
                        <option value="area_desc">По убыванию площади</option>
                    </select>
                </div>
                <div class="flats-filter-mobile-control-inner">
                    <button class="flats-filter-mobile-control-icon">
                         <div class="sort-icons-container">
                            <font-awesome-icon class="icon" icon="fa-solid fa-solid fa-table" :class="{'active': true}"/>
                        </div>
                    </button>
                    <select v-model="selectedDisplayMode" class="flats-filter-moblie-select">
                        <option value="grid">Карточки</option>
                        <option value="list">Список</option>
                    </select>
                </div>
                <!--<select class="flats-filter-mobile-display-variant"></select>-->
            </div>
        </div>
    </div>
</template>

<style scoped>

.flats-filter-container {
    width: 60%;
    min-width: calc(var(--ui-col) * 33);
    padding: 0.7rem;  
    display: flex;
    flex-direction: column; 
    position: relative;
}

.flats-filter-title {
    font-size: var(--font-size-large2);
    font-weight: 500;
    padding-bottom: 2rem;
}

.flats-filter-desktop {
    display: grid;
    grid-template-columns: repeat(4, 24%);
    gap: 1.1rem;

}

.sub-filter-info-container {
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
}

.custom-details {
    position: relative; 
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0;
  margin: 12px 0;
  
  transition: all 0.3s ease;
  width: 18rem;
}

.custom-multiselect {
  position: absolute;
  top:2rem;
  margin-top: 10px;
  left: 1rem;
  width: 90%;
  z-index: 1000;
  height: 2rem;
  font-size: var(--font-size-normal);
}



/* Элемент, который уже выбран, но можно отменить */
.multiselect__option--selected {
  background: #EFF6FF;  /* Голубой фон */
  color: #1E40AF;       /* Тёмно-синий текст */
}

/* При наведении на выбранный элемент */
.multiselect__option--selected.multiselect__option--highlight {
  background: #DBEAFE;  /* Светло-голубой при наведении */
  color: #1E3A8A;       /* Ещё темнее синий */
}

.custom-multiselect .multiselect__content-wrapper {
  
  width: 100%;
  z-index: 1001; /* Выше, чем сам Multiselect */
}

.custom-details-summary {
  list-style: none;
  cursor: pointer;
  padding: 12px 16px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #333;
  background-color: transparent;
  border-width: 0;
   width: 100%;
  box-sizing: border-box; /* Важно для правильного расчета ширины */
}

.summary-text {
  flex-grow: 1;
}

.details-icon {
  transition: transform 0.3s ease;
  margin-left: 12px;
  color: #666;
  font-size: 14px;
}

/* Анимация иконки при открытии */
.custom-details[open] .details-icon {
  transform: rotate(180deg);
}

/* Анимация содержимого */
.details-content {
    padding: 0 16px;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    border-width: 0;
    transition: 
        max-height 0.3s ease, 
        opacity 0.3s ease,
        padding 0.3s ease;
}

.custom-details[open] .details-content {
    max-height: 1000px; /* Достаточно большое значение */
    opacity: 1;
    height: 3rem;
    padding: 16px;
    padding-top: 8px;
}


.watch-flats-href {
    text-decoration: none;
    color: var(--vt-c-blue);
    font-weight: 500;
    font-size: var(--font-size-normal-mini);
    transition: 0.3s;
    display: flex;
    align-items: center;
}

.watch-flats-href:hover {
    color: var(--vt-c-light-blue);
    transform: all 0.5 ease;
}

.drop-filter-icon {
    font-size: var(--font-size-mini);
}

.drop-filters-button {
    font-size: var(--font-size-normal-mini);
    background: transparent;
    border-width: 0;
    color: var(--vt-c-gray);
    transition: 0.3s;
    display: flex;
    gap: 0.5rem;
    align-items: center;
}



.drop-filters-button:hover {
    color: var(--vt-c-blue);
    transform: all 0.5 ease;
} 

.rooms-select-container {
  position: relative;

  display: flex;
  flex-direction: column;
}

.rooms-select {
    background-color: var(--vt-c-light-gray);
    border-width: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    font-size: var(--font-size-normal-mini);
    transition: 0.3s;
}


.rooms-select:hover, .rooms-select.active {
    background-color: var(--vt-c-blue);
    color: var(--vt-c-white);
    transform: all 0.5 ease;
}

.rooms-select:disabled {
    pointer-events: none; 
}

.rooms-select-title {
  color: var(--vt-c-gray);
  font-size: var(--font-size-mini);
  padding-bottom: 0.5rem;
}

.rooms-select-inner {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 2.5rem;
  align-items: center;
  border-radius: 0.5rem;
  gap: 0.5rem;
}


.flats-filter-mobile {
    display: none;
    justify-content: space-between;
    gap: 1rem;
}
.flats-filter-mobile-controls {
    display: flex;
    gap: 1rem;
}

.flats-filter-mobile-control-inner {
    display: flex;
    position: relative;
}

.flats-filter-mobile-control-icon {
    z-index: 100;
    pointer-events: none;
    cursor: default;
    width: 2.3rem;
    height: 2.3rem;
    background-color: var(--vt-c-white);
    border-radius: 0.5rem;
    border: solid 1px var(--vt-c-blue)
}

.flats-filter-mobile-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    border-width: 0;
    background-color: var(--vt-c-blue);
    color: var(--vt-c-white);
    height: 2.3rem;
    width: 100%;
}

.icon {
      color: var(--vt-c-gray);
      transition: 0.3s;
}

.icon.active {
    color: var(--vt-c-blue);
    transform: all 0.5 ease;
}

.flats-filter-moblie-select {
    width: 2.3rem;
    height: 2.3rem;
    border-width: 0;
    display: flex;
  
    justify-content: center;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
    outline: none;
}

@media (max-width: 900px) {
    .flats-filter-mobile {
        display: flex;
    }

    .flats-filter-container {
         min-width: 100%;
    }

    .flats-filter-desktop, .sub-filter-info-container {
        display: none;
    }
}

</style>