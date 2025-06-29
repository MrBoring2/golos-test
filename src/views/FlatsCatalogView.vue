<script>
import FlatsCatalog from '@/components/FlatsCatalogView/FlatsCatalog.vue'
import FlatsFilter from '@/components/FlatsCatalogView/FlatsFilter.vue'
import flatsApiService from '@/services/flatsApiService'; 
import salesApiService from '@/services/salesApiService'

export default {
    data() {
        return {
            activeFilters: {},
            activeSort: undefined,
            activeDisplayMode: 'grid',
            sales: [],
            flatsData: [],
            startBoundaryValues: [],
            filteredBoundaryValues: { },
            isLoading: true
        }
    },

    components: {
        FlatsCatalog,
        FlatsFilter
    },
    methods: {
        async handleSortUpdate(newSort){  
            console.log('handeSortUpdate')  
            console.log(newSort)
            if(newSort == undefined || newSort == null) {this.activeSort = null; return};
          
            this.activeSort = {...this.activeSort, ...newSort}
             if (!this.isLoading) {
                await this.loadData();
            }
        },
        handleDisplayModeUpdate(mode) {
            this.activeDisplayMode = mode;
        },
        async loadData(){
            if(this.activeSort != undefined && this.activeSort.type != undefined){
                console.log(this.activeSort)
                this.activeFilters.orderBy = this.activeSort
            }
            else {
                delete this.activeFilters.orderBy
            }
            const response = await flatsApiService.getFlats(this.activeFilters);
            
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
        
        },
        async loadStartBoundaryValues() {
            this.startBoundaryValues = await flatsApiService.getStartBoundaryValues();
     
        },
        async update(filter) {   
            console.log('updated')  
            this.activeFilters = filter;
            //if(Object.keys(filter) == 0) return;
            await this.loadData()         
        },
        async loadSales() {
            this.sales = await salesApiService.getSales()
        },
        
         getCssVarInPx(varName) {
            const remValue = getComputedStyle(document.documentElement)
                .getPropertyValue(varName).
                trim()
            return parseFloat(remValue) * parseFloat(getComputedStyle(document.documentElement).fontSize)
        },
        scrollToCatalog() {
            console.log('csjhdlajsfljasfjlasfhljasfas')
            this.$nextTick(() => {
                const element = this.$refs.catalogAnchor;
      if (!element) return;

      // Получаем высоту шапки в пикселях
      const headerHeight = this.getCssVarInPx('--header-height') || 78.4; // 4.9rem fallback
      
      // Вычисляем позицию с отступом
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight; // Доп. отступ 20px


      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
        });
     }
    },
    computed: {
  
    },
    async created() {
        await Promise.all([
            this.loadSales(),
            this.loadStartBoundaryValues()
        ]);

        this.isLoading = false
    }
}

</script>

<template>
    <main class="main">
        <FlatsFilter @show-catalog="scrollToCatalog" v-if="startBoundaryValues && startBoundaryValues.data" :boundaryValues="startBoundaryValues.data" 
        :filteredBoundaryValues="filteredBoundaryValues" :sort="activeSort" @update-sort="handleSortUpdate" :displayMode="activeDisplayMode" :sales="sales.data"
        @update-display-mode="handleDisplayModeUpdate" @update-filter="update"/>
         <div ref="catalogAnchor" id="flats-catalog">
        <FlatsCatalog ref="catalogBlock"  v-if="flatsData && flatsData.data" :flats="flatsData.data.flats" :sort="activeSort" @update-sort="handleSortUpdate" 
        :displayMode="activeDisplayMode" @update-display-mode="handleDisplayModeUpdate" /></div>
    </main>
</template>

<style scoped>
 .main {
    width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;    
    margin-top: 2rem;
    
}

#flats-catalog {
    width: 100%;
}

 @media (max-width: 900px) {
   .main {
    gap: 40px;
   }
 }
</style>