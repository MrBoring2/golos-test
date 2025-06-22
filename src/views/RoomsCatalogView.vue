<script>
import RoomsCatalog from '@/components/RoomsCatalogView/RoomsCatalog.vue'


export default {
    data() {
        return {

        }
    },

    components: {
        RoomsCatalog
    },
    
}

</script>

<template>
    <main class="main">
        <RoomsCatalog/>
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