<script>
import { RouterLink } from 'vue-router';
import DoubleRangeInput from '../DoubleRangeInput.vue';
export default {
    data() {
        return {
            minPrice: this.filteredBoundaryValues.minPrice,
            maxPrice: this.filteredBoundaryValues.maxPrice,
            minArea: this.filteredBoundaryValues.minArea,
            maxArea: this.filteredBoundaryValues.maxArea,
            minFloor: this.filteredBoundaryValues.minFloor,
            maxFloor: this.filteredBoundaryValues.maxFloor,
            rooms: this.filteredBoundaryValues.rooms,
            totalItems: this.filteredBoundaryValues.totalItems,
            selectedRooms: []
        }
    },
    watch: {
        filteredBoundaryValues(newVal) {
              this.totalItems = newVal.totalItems
        //    this.minPrice = newVal.minPrice;
        //    this.maxPrice=newVal.maxPrice,
        //    this.minArea=newVal.minArea,
        //    this.maxArea=newVal.maxArea,
        //    this.minFloor=newVal.minFloor,
        //    this.maxFloor = newVal.maxFloor,
        //    this.rooms= newVal.rooms
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
                this.minPrice = newValues[0];
                this.maxPrice = newValues[1];
        }
        },
        updateAreaRange(newValues) {
            if (Array.isArray(newValues)) {
                this.minArea = newValues[0];
                this.maxArea = newValues[1];
            }
        },
        updateFloorRange(newValues) {
            if (Array.isArray(newValues)) {
                this.minFloor = newValues[0];
                this.maxFloor = newValues[1];
            }
        },
        updateFilter(){
            const filter = {
                minPrice: this.minPrice,
                maxPrice: this.maxPrice,
                minArea: this.minArea,
                maxArea: this.maxArea,
                minFloor: this.minFloor,
                maxFloor: this.maxFloor,
                rooms: this.selectedRooms
            }
            this.$emit('update-filter', filter)
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
            this.minPrice = this.boundaryValues.minPrice,
            this.maxPrice = this.boundaryValues.maxPrice,
            this.minFloor = this.boundaryValues.minFloor,
            this.maxFloor = this.boundaryValues.maxFloor,
            this.minArea = Math.floor(this.boundaryValues.minArea),
            this.maxArea = Math.ceil(this.boundaryValues.maxArea)
            this.selectedRooms = []
            this.updateFilter()
        },
        toggleRoom(room) {
        if (this.selectedRooms.includes(room)) {
            this.selectedRooms = this.selectedRooms.filter(r => r !== room);
        } else {
            this.selectedRooms.push(room);
        }
        this.updateFilter();
    }
    },
    props: ['sort', 'displayMode', 'boundaryValues', 'filteredBoundaryValues'],
    components: {
        DoubleRangeInput
    },
    mounted() {
      
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
                    <button class="rooms-select" :disabled="!rooms.includes(1)" @click="toggleRoom(1)" :class="{'active': selectedRooms.includes(1)}">
                        <p>1</p>
                    </button>
                    <button class="rooms-select" :disabled="!rooms.includes(2)" @click="toggleRoom(2)" :class="{'active': selectedRooms.includes(2)}">
                        <p>2</p>
                    </button>
                    <button class="rooms-select" :disabled="!rooms.includes(3)" @click="toggleRoom(3)" :class="{'active': selectedRooms.includes(3)}">
                        <p>3</p>
                    </button>
                    <button class="rooms-select" :disabled="!rooms.includes(4)" @click="toggleRoom(4)" :class="{'active': selectedRooms.includes(4)}">
                        <p>4+</p>
                    </button>
                </div>
                
            </div>
            <DoubleRangeInput  class="range-input" @drag-end="updateFilter"
                :min="boundaryValues.minPrice"
                :max="boundaryValues.maxPrice"
                :value="[minPrice, maxPrice]"
                @input="updatePriceRange" title="Стоимость, ₽" @update-input="updateFilter"
            />
            <DoubleRangeInput class="range-input" @drag-end="updateFilter"
                :min="Math.floor(boundaryValues.minArea)"
                :max="Math.ceil(boundaryValues.maxArea)"
                :value="[minArea, maxArea]"
                @input="updateAreaRange" title="Площадь, м²" @update-input="updateFilter"
            />
            <DoubleRangeInput class="range-input" @drag-end="updateFilter"
                :min="boundaryValues.minFloor"
                :max="boundaryValues.maxFloor"
                :value="[minFloor, maxFloor]"
                @input="updateFloorRange" title="Этаж" @update-input="updateFilter"
            />
        </div>
        <div class="sub-filter-info-container">
            <p>Расширенный фильтр</p>
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

.watch-flats-href {
    text-decoration: none;
    color: var(--vt-c-blue);
    font-weight: 500;
    font-size: var(--font-size-normal-mini);
    transition: 0.3s;
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