<script>
import FlatsCatalog from '@/components/FlatsCatalogView/FlatsCatalog.vue'
import FlatsFilter from '@/components/FlatsCatalogView/FlatsFilter.vue'
import flatsApiService from '@/services/flatsApiService'; 
import salesApiService from '@/services/salesApiService'

export default {
    data() {
        return {
            activeFilters: {},
            activeSort: {type: null, direction: null},
            activeDisplayMode: 'grid',
            sales: [],
            flatsData: [],
            startBoundaryValues: [],
            filteredBoundaryValues: { }
        }
    },

    components: {
        FlatsCatalog,
        FlatsFilter
    },
    methods: {
        async handleSortUpdate(newSort){        
            this.activeSort = {...this.activeSort, ...newSort}
            await this.loadData()
        },
        handleDisplayModeUpdate(mode) {
            this.activeDisplayMode = mode;
        },
        async loadData(){
            console.log('Фильтры')
            console.log(this.activeFilters)
            this.activeFilters.orderBy = this.activeSort
            const response = await flatsApiService.getFlats(this.activeFilters);
            //нужно реактивно обновить полностью объект
            this.flatsData = {
                ...response,
                data: {
                ...response.data,
                flats: [...response.data.flats] 
                }
            };
            this.filteredBoundaryValues = {
                maxPrice: this.flatsData.data.maxPrice,
                minPrice: this.flatsData.data.minPrice,
                maxFloor: this.flatsData.data.maxFloor,
                minFloor: this.flatsData.data.minFloor,
                maxArea: Math.ceil(this.flatsData.data.maxArea),
                minArea: Math.floor(this.flatsData.data.minArea),
                rooms: this.flatsData.data.rooms,
                totalItems: this.flatsData.data.totalItems
            }
            console.log(this.filteredBoundaryValues)
        
        },
        async loadStartBoundaryValues() {
            this.startBoundaryValues = await flatsApiService.getStartBoundaryValues();
     
        },
        async update(filter) {
            this.activeFilters = filter;
            await this.loadData()         
        },
        async loadSales() {
            this.sales = await salesApiService.getSales()
        }
    },
    computed: {
  
    },
    async created() {
        await this.loadSales();
        await this.loadStartBoundaryValues();
        await this.loadData(this.activeFilters)
    }
}

</script>

<template>
    <main class="main">
        <FlatsFilter  v-if="flatsData && flatsData.data && startBoundaryValues && startBoundaryValues.data" :boundaryValues="startBoundaryValues.data" 
        :filteredBoundaryValues="filteredBoundaryValues" :sort="activeSort" @update-sort="handleSortUpdate" :displayMode="activeDisplayMode" :sales="sales.data"
        @update-display-mode="handleDisplayModeUpdate" @update-filter="update"/>
        <FlatsCatalog  id="flats-catalog" v-if="flatsData && flatsData.data" :flats="flatsData.data.flats" :sort="activeSort" @update-sort="handleSortUpdate" 
        :displayMode="activeDisplayMode" @update-display-mode="handleDisplayModeUpdate" />
    </main>
</template>

<style scoped>
 .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;   
    gap: 3rem; 
    margin-top: 2rem;
  
    
}

 @media (max-width: 900px) {
   .main {
    gap: 40px;
   }
 }
</style>