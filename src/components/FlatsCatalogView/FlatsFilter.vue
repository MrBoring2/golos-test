<script>
import DoubleRangeInput from '../DoubleRangeInput.vue';
export default {
    data() {
        return {
            minPrice: this.boundaryValues.minPrice,
            maxPrice: this.boundaryValues.maxPrice
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
         updatePriceRange([newMin, newMax]) {
      this.minPrice = newMin;
      this.maxPrice = newMax;
      console.log('Updated range:', newMin, newMax);
    }
    },
    props: ['sort', 'displayMode', 'boundaryValues'],
    components: {
        DoubleRangeInput
    },
    mounted() {
        console.log(this.boundaryValues)
    }
}

</script>

<template>
    <div class="flats-filter-container">
        <div class="flats-filter-title">
            <p>Подбор по параметрам</p>
        </div>
        <div class="fltas-filter-desktop">
            <DoubleRangeInput
    :min="boundaryValues.minPrice"
    :max="boundaryValues.maxPrice"
    :value="[minPrice, maxPrice]"
    @input="updatePriceRange"
  />
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
}

</style>