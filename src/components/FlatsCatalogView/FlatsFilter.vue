<script>
import 'vue-select/dist/vue-select.css';
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
            selectedSales: undefined,
            rooms: this.filteredBoundaryValues.rooms,
            },
            mobileDrawerOpen: false,
            totalItems: this.filteredBoundaryValues.totalItems,
            currentFilter: {},
            displaySearch: {},
            showChildren: false,
            isLoading: true      
        }
    },
    watch: {
        filteredBoundaryValues: {
            handler(newVal) {
            console.log('filtered')
            console.log(newVal)
            const hasInvalidValue = Object.values(newVal).some(
                val => val === undefined || (typeof val === 'number' && isNaN(val))
            );
      
            if (hasInvalidValue) {
                this.initDefaultFilters();
                return;
            }
             this.totalItems = newVal.totalItems
             this.values.minPrice = this.currentFilter.minPrice == undefined && newVal.minPrice != undefined ? newVal.minPrice : this.values.minPrice;
             this.values.maxPrice = this.currentFilter.maxPrice == undefined && newVal.maxPrice != undefined ? newVal.maxPrice : this.values.maxPrice;
             this.values.minArea = this.currentFilter.minArea == undefined && newVal.minArea != undefined ? newVal.minArea  : this.values.minArea;
             this.values.maxArea = this.currentFilter.maxArea == undefined && newVal.maxArea != undefined ? newVal.maxArea : this.values.maxArea;
             this.values.minFloor =this.currentFilter.minFloor == undefined && newVal.minFloor != undefined ? newVal.minFloor : this.values.minFloor;
             this.values.maxFloor = this.currentFilter.maxFloor == undefined && newVal.maxFloor != undefined ? newVal.maxFloor : this.values.maxFloor;
             if(isNaN(this.values.minArea)) this.values.minArea = Math.floor(this.boundaryValues.minArea);
             if(isNaN(this.values.maxArea))  this.values.maxArea = Math.ceil(this.boundaryValues.maxArea);
            },
            deep: true,
            immediate: true
        },
        'values.selectedSales': {
            handler(newVal, oldVal) {
                console.log('test')
            console.log(this.currentFilter.selectedSales)
            console.log(newVal)
            console.log(oldVal)
            if(this.currentFilter.selectedSales === newVal) return;
            console.log('Selected sales changed:', newVal);
            if(newVal != undefined && newVal.length == 0){
                    delete this.currentFilter.selectedSales
                    delete this.displaySearch.selectedSales
            }

            if(this.currentFilter.selectedSales == undefined || this.values.selectedSales.length > 0)
                this.updateFilter('', 'selectedSales')
            },
            deep: true
        },
        sort(newVal) {
            this.updateDisplaySearch('orderBy', '')
            if(newVal == undefined){
                delete this.currentFilter.orderBy
                delete this.displaySearch.orderBy
            }
        },
        currentFilter: {
            handler(newFilter) {
            this.updateUrlFilters();
        },
    deep: true 
  }     
    },

    computed: {
        
        selectedSort: {
                get() {
                    if(this.sort == undefined) return 'undefined';
                    return `${this.sort.type}_${this.sort.direction}`;
                },
                set(value) {
       
                    if(this.sort != value) {
                        if(value == undefined || value == 'undefined') {
  
                            this.$emit('update-sort', undefined)
                        }
                        else{
                      
                        const [type, direction] = value.split('_');
                        this.$emit('update-sort', {type, direction})
                        }
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
        },
        activeDisplayedFilters() {
            return Object.fromEntries(
                Object.entries(this.displaySearch)
                .filter(([_, value]) => Boolean(value))
            );
        }
    },
    
    methods: {
        initDefaultFilters() {
            this.values = {
            minPrice: this.values.minPrice == undefined ? this.boundaryValues?.minPrice || 0 : this.values.minPrice,
            maxPrice: this.values.maxPrice == undefined ? this.boundaryValues?.maxPrice || 10000000 : this.values.maxPrice,
            minArea: this.values.minArea == undefined ? Math.floor(this.boundaryValues?.minArea || 0) : this.values.minArea,
            maxArea: this.values.maxArea == undefined ? Math.ceil(this.boundaryValues?.maxArea || 100) : this.values.maxArea,
            minFloor: this.values.minFloor == undefined ? this.boundaryValues?.minFloor || 1 : this.values.minFloor,
            maxFloor: this.values.maxFloor == undefined ? this.boundaryValues?.maxFloor || 8 : this.values.maxFloor,
            selectedRooms: this.values.selectedRooms,
            selectedSales: this.values.selectedSales,
            rooms: this.boundaryValues?.rooms || [1, 2, 3, 4]
        };
        this.totalItems = 0
        if(this.currentFilter == undefined)
            this.currentFilter = {};
        if(this.displaySearch == undefined)
            this.displaySearch = {};
        },
        openMobileFilterDrawer() {
            this.mobileDrawerOpen = !this.mobileDrawerOpen;
        },
         updatePriceRange(newValues) {
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
        updateUrlFilters() {
            const query = {};

            if (this.currentFilter.minPrice) query.min_price = this.currentFilter.minPrice;
            if (this.currentFilter.maxPrice) query.max_price = this.currentFilter.maxPrice;

            if (this.currentFilter.minArea) query.min_area = this.currentFilter.minArea;
            if (this.currentFilter.maxArea) query.max_area = this.currentFilter.maxArea;

            if (this.currentFilter.minFloor) query.min_floor = this.currentFilter.minFloor;
            if (this.currentFilter.maxFloor) query.max_floor = this.currentFilter.maxFloor;

            if (this.currentFilter.orderBy) {
                query.order_by = `${this.currentFilter.orderBy.type}_${this.currentFilter.orderBy.direction}`
            };

            if (this.currentFilter.selectedRooms?.length) {
            query.rooms = this.currentFilter.selectedRooms.join(',');
            }

            if (this.currentFilter.selectedSales?.length) {
                query.sales = this.currentFilter.selectedSales.join(',');
            }


            this.$router.replace({
                path: this.$route.path,
                query,
     
    });
  },
  parseUrlFilters(query) {
    this.isLoading = true
    const oldFilter = {...this.currentFilter};
    if (query.min_price) {
        this.values.minPrice = Number(query.min_price);
        this.currentFilter.minPrice = this.values.minPrice;
        this.updateDisplaySearch('price', 'min');
    }
    if(query.max_price){
        this.values.maxPrice = Number(query.max_price);
        this.currentFilter.maxPrice = this.values.maxPrice;
        this.updateDisplaySearch('price', 'max');
    }
    if(query.min_area){
        this.values.minArea = Number(query.min_area);
        this.currentFilter.minArea = this.values.minArea;
        this.updateDisplaySearch('area', 'min');
    }
    if(query.max_area){
        this.values.maxArea = Number(query.max_area);
        this.currentFilter.maxArea = this.values.maxArea;
        this.updateDisplaySearch('area', 'max');
    }
    if(query.min_floor){
        this.values.minFloor = Number(query.min_floor);
        this.currentFilter.minFloor = this.values.minFloor;
        this.updateDisplaySearch('floor', 'min');
    }
    if(query.max_floor){
        this.values.maxFloor = Number(query.max_floor);
        this.currentFilter.maxFloor = this.values.maxFloor;
        this.updateDisplaySearch('floor', 'max');
    }

    if(query.order_by) {
        
        const [type, direction] = query.order_by.split('_')
        this.selectedSort = `${type}_${direction}`   
        this.currentFilter.orderBy = {type: type, direction: direction};
        this.updateDisplaySearch('orderBy', '');
        console.log(this.selectedSort)
    }

    if (query.rooms) {
      this.values.selectedRooms = query.rooms.split(',').map(Number);
      this.currentFilter.selectedRooms = this.values.selectedRooms;
      this.updateDisplaySearch('selectedRooms', '');
    }
    if (query.sales) {
      this.values.selectedSales = query.sales.split(',');
      this.currentFilter.selectedSales = this.values.selectedSales;
      this.selectedSale = this.currentFilter.selectedSales[0]
      this.updateDisplaySearch('selectedSales', '');
    }
      if (!this.isInitializing || JSON.stringify(oldFilter) !== JSON.stringify(this.currentFilter)) {
        this.$emit('update-filter', this.currentFilter);
    }
    
    this.isLoading = false;
  },

         getFilterKey(index, type) {
                return index ? `${index}${type.charAt(0).toUpperCase() + type.slice(1)}`  :    type;
            },
        updateFilter(index, type){
            if(type == '') return;
            const filterKey = this.getFilterKey(index, type);
            this.updateCurrentFilterKey(filterKey, type);
            this.updateDisplaySearch(filterKey, index);
            this.$emit('update-filter', this.currentFilter);
        },
        updateCurrentFilterKey(filterKey, type){
            const value = this.values[filterKey];
        
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    this.currentFilter[filterKey] = value;
                } else {
                    delete this.currentFilter[filterKey];
            }   
            } else if (value !== undefined && value !== null) {
                this.currentFilter[filterKey] = value;
            }
        },
        updateDisplaySearch(filterKey, index) {
        if (!index) {
       
            if (filterKey === 'selectedRooms' && this.currentFilter[filterKey] != undefined) {
                this.displaySearch[filterKey] = this.currentFilter[filterKey]?.map(item => `${item}-комнатная`).join(", ") || '';
            }
            if (filterKey === 'selectedSales' && this.currentFilter[filterKey] != undefined) {
                
                this.displaySearch[filterKey] = this.currentFilter[filterKey]?.map(item => `${item}`).join(", ") || '';
            }
            if (filterKey === 'orderBy' && this.currentFilter[filterKey] != undefined) {
                const type = this.currentFilter[filterKey].type;
                let typeString ='цены'
                const direction = this.currentFilter[filterKey].direction;
                let directionString = 'по возрастанию'
                if(direction == 'desc')
                    directionString = 'по убыванию'
                if(type == 'area')
                    typeString = 'площади'
                this.displaySearch[filterKey] = `${directionString} ${typeString}`
            }
            return;
        }
        
        const rangeType = filterKey.replace(/^(min|max)/, '').toLowerCase();

        const minVal = this.currentFilter[`min${rangeType.charAt(0).toUpperCase() + rangeType.slice(1)}`];
        const maxVal = this.currentFilter[`max${rangeType.charAt(0).toUpperCase() + rangeType.slice(1)}`];
        const units = {
            price: ' руб.',
            area: ' м²',
            floor: ''
        };
        if (minVal && maxVal) {
            this.displaySearch[rangeType] = `от ${minVal} до ${maxVal} ${units[rangeType]}`;
        } else if (minVal) {
            this.displaySearch[rangeType] = `от ${minVal} ${units[rangeType]}`;
        } else if (maxVal) {
            this.displaySearch[rangeType] = `до ${maxVal} ${units[rangeType]}`;
        }
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
        removeFilter(key){
           if (['price', 'area', 'floor'].includes(key)) {
    const prefix = key.charAt(0).toUpperCase() + key.slice(1);
    this.values[`min${prefix}`] = null;
    this.values[`max${prefix}`] = null;
    delete this.currentFilter[`min${prefix}`];
    delete this.currentFilter[`max${prefix}`];
  } 
  else if (key === 'selectedRooms') {
    this.values.selectedRooms = [];
    delete this.currentFilter.selectedRooms;
  }
  else if (key === 'selectedSales') {
    this.values.selectedSales = [];
    this.selectedSale = null;
    delete this.currentFilter.selectedSales;
  }
  else if(key == 'orderBy') {
    this.selectedSort = undefined
     delete this.currentFilter.orderBy;
  }

  const newDisplaySearch = {...this.displaySearch};
  delete newDisplaySearch[key];
  this.displaySearch = newDisplaySearch;

  this.$emit('update-filter', this.currentFilter);
        },
        dropFilters() {
            this.values.minPrice = this.boundaryValues.minPrice,
            this.values.maxPrice = this.boundaryValues.maxPrice,
            this.values.minFloor = this.boundaryValues.minFloor,
            this.values.maxFloor = this.boundaryValues.maxFloor,
            this.values.minArea = Math.floor(this.boundaryValues.minArea),
            this.values.maxArea = Math.ceil(this.boundaryValues.maxArea)
            this.values.selectedRooms = undefined
            this.values.selectedSales = undefined
            this.selectedSort = undefined
            this.currentFilter = {};
            this.displaySearch = {}; 
            this.$emit('update-filter', this.currentFilter)
            if(this.mobileDrawerOpen == true) this.mobileDrawerOpen = false
        },
        watchCatalog() {
            this.$emit('show-catalog')
            if(this.mobileDrawerOpen == true) this.mobileDrawerOpen = false
        },
        toggleRoom(room) {
            if(this.values.selectedRooms == undefined)
                    this.values.selectedRooms = []
            if (this.values.selectedRooms.includes(room)) {
                this.values.selectedRooms = this.values.selectedRooms.filter(r => r !== room);
                if(this.values.selectedRooms.length == 0){
                    delete this.currentFilter.selectedRooms
                    delete this.displaySearch.selectedRooms
                }
            } else {
                this.values.selectedRooms.push(room);
            }

            this.updateFilter("", "selectedRooms")
        }
    },
    props: ['sort', 'displayMode', 'boundaryValues', 'filteredBoundaryValues', 'sales'],
    components: {
        DoubleRangeInput
    },
    mounted() {
        this.parseUrlFilters(this.$route.query);
        //когда перезагружаем страницу, и если у нас был пустой список квартир, то обновляем фильтры (2 условие)
        if (Object.keys(this.$route.query).length === 0 || this.filteredBoundaryValues.totalItems == undefined) {
            console.log('loaded')
            console.log(this.$route.query)
            this.initDefaultFilters();
        }
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
                    <button class="rooms-select" :disabled="values.rooms != undefined && !values.rooms.includes(1)" @click="toggleRoom(1)" :class="{'active': currentFilter.selectedRooms != undefined ? currentFilter.selectedRooms.includes(1) : false}">
                        <p>1</p>
                    </button>
                    <button class="rooms-select" :disabled="values.rooms != undefined &&!values.rooms.includes(2)" @click="toggleRoom(2)" :class="{'active': currentFilter.selectedRooms != undefined ? currentFilter.selectedRooms.includes(2) : false}">
                        <p>2</p>
                    </button>
                    <button class="rooms-select" :disabled="values.rooms != undefined &&!values.rooms.includes(3)" @click="toggleRoom(3)" :class="{'active': currentFilter.selectedRooms != undefined ? currentFilter.selectedRooms.includes(3) : false}">
                        <p>3</p>
                    </button>
                    <button class="rooms-select" :disabled="values.rooms != undefined &&!values.rooms.includes(4)" @click="toggleRoom(4)" :class="{'active': currentFilter.selectedRooms != undefined ? currentFilter.selectedRooms.includes(4) : false}">
                        <p>4+</p>
                    </button>
                </div>
            </div>
            <DoubleRangeInput  class="range-input" @drag-end="updateFilter($event, 'price')"
                :min="boundaryValues.minPrice" 
                :max="boundaryValues.maxPrice"
                :value="[values.minPrice, values.maxPrice]"
                @input="updatePriceRange" title="Стоимость, ₽" @update-input="updateFilter($event, 'price')"
            />
            <DoubleRangeInput class="range-input" @drag-end="updateFilter($event, 'area')"
                :min="Math.floor(boundaryValues.minArea)"
                :max="Math.ceil(boundaryValues.maxArea)" 
                :value="[values.minArea, values.maxArea]"
                @input="updateAreaRange" title="Площадь, м²" @update-input="updateFilter($event, 'area')"
            />
            <DoubleRangeInput class="range-input" @drag-end="updateFilter($event, 'floor')"
                :min="boundaryValues.minFloor" clickable="false"  
                :max="boundaryValues.maxFloor"
                :value="[values.minFloor, values.maxFloor]"
                @input="updateFloorRange" title="Этаж" @update-input="updateFilter($event, 'floor')"
            />
        </div>


        <Transition name="drawer">
            <div class="flats-filter-mobile-wrapper" v-if="mobileDrawerOpen">
                <div class="flats-filter-mobile-wrapper-header">
                    <p class="flats-filter-mobile-wrapper-header-title">Фильтр</p>
                    <button class="flats-filter-moblie-wrapper-header-button" @click="openMobileFilterDrawer">
                        <font-awesome-icon icon="fa-solid fa-close"/>
                    </button>
                </div>
                <div class="flats-filter-mobile-wrapper-middle">
                    <div class="rooms-select-container">
                <div class="rooms-select-title">
                    <p>Комнатность</p>
                </div>
                <div class="rooms-select-inner">
                    <button class="rooms-select" :disabled="!values.rooms.includes(1)" @click="toggleRoom(1)" :class="{'active': currentFilter.selectedRooms != undefined ? currentFilter.selectedRooms.includes(1) : false}">
                        <p>1</p>
                    </button>
                    <button class="rooms-select" :disabled="!values.rooms.includes(2)" @click="toggleRoom(2)" :class="{'active': currentFilter.selectedRooms != undefined ? currentFilter.selectedRooms.includes(2) : false}">
                        <p>2</p>
                    </button>
                    <button class="rooms-select" :disabled="!values.rooms.includes(3)" @click="toggleRoom(3)" :class="{'active': currentFilter.selectedRooms != undefined ? currentFilter.selectedRooms.includes(3) : false}">
                        <p>3</p>
                    </button>
                    <button class="rooms-select" :disabled="!values.rooms.includes(4)" @click="toggleRoom(4)" :class="{'active': currentFilter.selectedRooms != undefined ? currentFilter.selectedRooms.includes(4) : false}">
                        <p>4+</p>
                    </button>
                </div>
            </div>
            <DoubleRangeInput  class="range-input" @drag-end="updateFilter($event, 'price')"
                :min="boundaryValues.minPrice" 
                :max="boundaryValues.maxPrice"
                :value="[values.minPrice, values.maxPrice]"
                @input="updatePriceRange" title="Стоимость, ₽" @update-input="updateFilter($event, 'price')"
            />
            <DoubleRangeInput class="range-input" @drag-end="updateFilter($event, 'area')"
                :min="Math.floor(boundaryValues.minArea)"
                :max="Math.ceil(boundaryValues.maxArea)" 
                :value="[values.minArea, values.maxArea]"
                @input="updateAreaRange" title="Площадь, м²" @update-input="updateFilter($event, 'area')"
            />
            <DoubleRangeInput class="range-input" @drag-end="updateFilter($event, 'floor')"
                :min="boundaryValues.minFloor" clickable="false"  
                :max="boundaryValues.maxFloor"
                :value="[values.minFloor, values.maxFloor]"
                @input="updateFloorRange" title="Этаж" @update-input="updateFilter($event, 'floor')"
            />
            <details class="custom-details">
                      <summary class="custom-details-summary">
                       <span class="summary-text">Расширенный фильтр</span>
                       <font-awesome-icon icon="fa-solid fa-chevron-down" class="details-icon"></font-awesome-icon>
                       </summary>
                      <div class="details-content">
                        <p class="details-content-title">Акции</p>
                        <div class="details-content-inner">
                            <v-select class="custom-multiselect" multiple :searchable=false placeholder="Выберите параметр" v-model="values.selectedSales" :options="sales.map(sale => sale.Title)"/>
                        </div>
                    </div>
                </details>
                </div>
                <div class="flats-filter-mobile-wrapper-footer">
                    <button class="watch-flats-button" @click="watchCatalog">Смотреть {{totalItems}} объект{{declineObject(totalItems)}}</button>
                    <button class="drop-filters-button" @click="dropFilters">
                        <p>Сбросить фильтры</p>
                        <font-awesome-icon class="drop-filter-icon" icon="fa-solid fa-close" size="xl"/> 
                    </button>
                </div>
            
        </div>
        </Transition>
        
        
        <div class="flats-filter-mobile">
            <button class="flats-filter-mobile-button" @click="openMobileFilterDrawer">
                <font-awesome-icon icon="fa-solid fa-filter" />
                <p>Фильтр</p>
            </button>
            <div class="flats-filter-mobile-controls">
                <div class="flats-filter-mobile-control-inner">
                    <button class="flats-filter-mobile-control-icon">
                         <div class="sort-icons-container">
                            <font-awesome-icon class="icon" icon="fa-solid fa-arrow-up-long" :class="{'active': this.sort != undefined && this.sort.direction == 'asc'}"/>
                            <font-awesome-icon class="icon" icon="fa-solid fa-arrow-down-long" :class="{'active': this.sort != undefined && this.sort.direction == 'desc'}"/>
                        </div>
                    </button>
                    <select v-model="selectedSort" class="flats-filter-moblie-select">
                        <option value="undefined">По умолчанию</option>
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
        <div class="sub-filter-info-container">
                  <details class="custom-details">
                      <summary class="custom-details-summary">
                       <span class="summary-text">Расширенный фильтр</span>
                       <font-awesome-icon icon="fa-solid fa-chevron-down" class="details-icon"></font-awesome-icon>
                       </summary>
                      <div class="details-content">
                        <p class="details-content-title">Акции</p>
                        <div class="details-content-inner">
                            <v-select class="custom-multiselect" multiple :searchable=false placeholder="Выберите параметр" v-model="values.selectedSales" :options="sales?.map(sale => sale.Title) || []"/>
                        </div>
                    </div>
                </details>
                <div class="watch-flats-container">
                    <button  class="watch-flats-button" @click="watchCatalog">Смотреть {{totalItems}} объект{{declineObject(totalItems)}}</button>
                </div>
                <div class="drop-filters-container">
                    <button class="drop-filters-button" @click="dropFilters">
                    <p>Сбросить фильтры</p>
                    <font-awesome-icon class="drop-filter-icon" icon="fa-solid fa-close" size="xl"/> 
                    </button>
                </div>
           
        </div>
        <transition
            name="fade"
            @after-enter="showChildren = true"
            @before-leave="showChildren = false"
        >
        <div class="display-filter-container" v-if="Object.keys(currentFilter) != 0">
            <p>Ваш поиск: </p>
            <transition-group name="slide-fade">
            <div class="display-filter-item" v-for="(filter, index) in displaySearch"  :key="index" v-if="showChildren">
                <p class="display-filter-item-text">{{ filter }}</p>
                <button class="display-filter-item-button" @click="removeFilter(index)">
                    <font-awesome-icon icon="fa-solid fa-close" />
                </button>
            </div>
            </transition-group>
        </div>
        </transition>
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

.flats-filter-mobile-wrapper {
    display: none;
}

.flats-filter-desktop {
    display: grid;
    grid-template-columns: repeat(4, 24%);
    gap: 1.1rem;

}

.sub-filter-info-container {
    position: relative;
    min-height: auto;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    align-items: center;
}

.custom-details {
  position: relative; 
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0;
  height: max-content;
  margin: 12px 0;
  border-width: 0;
  transition: all 0.3s ease;
  width: 72%;

}

.custom-multiselect {
  width: 19.5rem;
  z-index: 10;
  border-radius: 0.5rem;
  background: var(--vt-c-light-gray);
  border-color: var(--vt-c-light-gray);
  border-width: 0 !important;
  font-size: var(--font-size-normal-mini);
}

.display-filter-container {
    display: flex;
    gap: 1rem;
    background: var(--vt-c-light-gray);
    height: 2.5rem;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    width: max-content;
    font-size: var(--font-size-normal-mini);
    font-weight: 500;
    border-radius: 0.5rem;
}

.display-filter-item {
    background: var(--vt-c-white);
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    font-size: var(--font-size-mini);
    font-weight: 500;
    display: flex;

}

.display-filter-item-text {
    padding-right: 0.5rem;
    border-right: solid 1px var(--vt-c-gray);
}

.display-filter-item-button {
    padding-left: 0.5rem;
    background: transparent;
    border-width: 0;
    transition: 0.3s;
        align-items: center;
    justify-content: center;
    display: flex;
}

.display-filter-item-button:hover {
    transform: rotate(90deg);
}

.custom-multiselect .multiselect__content-wrapper {
  
  width: 100%;
  z-index: 10; 
}

.custom-details-summary {
  list-style: none;
  cursor: pointer;
  position: relative;
  display: flex;

  align-items: center;
  font-weight: 600;
    
  background-color: transparent;
  border-width: 0;
   width: 100%;
  box-sizing: border-box; 
}

.summary-text {
  width: max-content;
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
    display: flex;
    flex-direction: column;
    padding: 0 !important;

    opacity: 0;
    border-width: 0;

    transition: 
        max-height 0.3s ease, 
        opacity 0.3s ease,
        padding 0.3s ease;
}

.details-content-title {
    font-size: var(--font-size-mini);
    color: var(--vt-c-gray);
}

.details-content-inner {
    left: 0;
  
    padding: 0;
}

.custom-details[open] .details-content {
    max-height: 1000px; /* Достаточно большое значение */
    opacity: 1;
   

}
.watch-flats-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.watch-flats-button {
    text-decoration: none;
    background: transparent;
    border-width: 0;
    height: max-content;
    color: var(--vt-c-blue);
    font-weight: 500;
    font-size: var(--font-size-normal-mini);
    transition: 0.3s;
    display: flex;
    align-items: center;
}

.watch-flats-button:hover {
    color: var(--vt-c-light-blue);
    transform: all 0.5 ease;
}

.drop-filter-icon {
    font-size: var(--font-size-mini);
}

.drop-filters-container {
    width: 100%;
    display: flex;
    justify-content: end;
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


.rooms-select:hover {
    background-color: var(--vt-c-blue);
    color: var(--vt-c-white);
    transform: all 0.5 ease;
}

.rooms-select.active {
   background-color: var(--vt-c-dark-indigo);
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

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}


.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
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

    .flats-filter-title {
        font-size: var(--font-size-normal3);
    }
    .display-filter-container {
        margin-top: 1rem;
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        min-width: 100%;
        width: 100%;
        flex-wrap: nowrap;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
    }

    .flats-filter-mobile-wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding-left: 1rem;
        padding-right: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: var(--vt-c-white);
        z-index: 10000;
    }

    .flats-filter-mobile-wrapper-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
    }
    
    .flats-filter-mobile-wrapper-header-title {
        font-weight: 500;
        font-size: var(--font-size-normal2);
    }

    .flats-filter-moblie-wrapper-header-button {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 0.5rem;
        border-width: 0;
        background: var(--vt-c-blue);
        color: var(--vt-c-white);
        font-size: var(--font-size-normal);
    }

    .flats-filter-mobile-wrapper-middle {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100%;
    }

    .custom-details {
        width: 100%;
    }

    .flats-filter-mobile-wrapper-footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .watch-flats-button {
        background: var(--vt-c-blue);
        color: var(--vt-c-white);
    } 

    .watch-flats-button, .drop-filters-button {
        min-width: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 2.5rem;
        border-radius: 0.5rem;
        align-items: center;
        text-align: center;
    }
}

</style>