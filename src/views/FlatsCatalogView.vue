<script>
import FlatsCatalog from '@/components/FlatsCatalogView/FlatsCatalog.vue'
import FlatsFilter from '@/components/FlatsCatalogView/FlatsFilter.vue'
import flatsApiService from '@/services/flatsApiService'; 

export default {
    data() {
        return {
            acvtiveFilters: {},
            activeSort: {type: null, direction: null},
            activeDisplayMode: 'grid',
            flatsData: []
        }
    },

    components: {
        FlatsCatalog,
        FlatsFilter
    },
    methods: {
        handleSortUpdate(newSort){        
            this.activeSort = {...this.activeSort, ...newSort}
        },
        handleDisplayModeUpdate(mode) {
            console.log(mode);
            this.activeDisplayMode = mode;
        },
        async loadData(){
            const params = {};
            this.flatsData = await flatsApiService.getFlats()
            console.log(this.flatsData)
        }
    },
    computed: {
        getBoundaryValues() {
            return {
                maxPrice: this.flatsData.data.maxPrice,
                minPrice: this.flatsData.data.minPrice,
                maxFloor: this.flatsData.data.maxFloor,
                minFloor: this.flatsData.data.minFloor,
                maxArea: this.flatsData.data.maxArea,
                minArea: this.flatsData.data.minArea
            }
        }
    },
    async created() {
        await this.loadData()
    }
}

</script>

<template>
    <main class="main">
        <FlatsFilter  v-if="flatsData && flatsData.data" :boundaryValues="getBoundaryValues" :sort="activeSort" @update-sort="handleSortUpdate" :displayMode="activeDisplayMode" @update-display-mode="handleDisplayModeUpdate"/>
        <FlatsCatalog v-if="flatsData && flatsData.data" :flats="flatsData.data.flats" :sort="activeSort" @update-sort="handleSortUpdate" :displayMode="activeDisplayMode" @update-display-mode="handleDisplayModeUpdate"/>
    </main>
</template>

<style scoped>
 .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;   
    gap: 80px; 
    
}

 @media (max-width: 900px) {
   .main {
    gap: 40px;
   }
 }
</style>