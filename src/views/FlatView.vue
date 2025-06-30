<script>
import flatsApiService from '@/services/flatsApiService'; 
import FlatDetails from '@/components/FlatView/FlatDetails.vue';
export default {
    data() {
        return {
            flatData: null,
        }
    },
    props: ['flatId'],
    methods: {
        async loadData(){
            const response = await flatsApiService.getFlat(this.flatId); 
            this.flatData = response.data[0]
        },
        getFlatId() {
            console.log('quert')
            console.log(this.$route.query)
           return this.$route.query.id; 
        }
    },
    async created() {
        console.log(this.flatId)
        if(this.flatId != undefined) {
            this.loadData()
        }
    },
    components: {
        FlatDetails
    }
}
</script>

<template>
    <main class="flat-main">
        <FlatDetails :flatData="flatData" v-if="flatData != undefined && flatData != null"/>
    </main>
</template>

<style scoped>

.flat-main {
    width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;    
    margin-top: 3rem;
}
</style>