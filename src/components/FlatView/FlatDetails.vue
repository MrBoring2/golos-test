<script>
export default {
    data() {
        return {
            selectedImageDisplayIndex: 0,
        }
    },
    props: ['flatData']
}
</script>

<template>
    <div class="flat-details-container">
        <div class="flat-images-container" >
            <Transition mode="out-in" >
                <div class="flat-image-inner" :key="selectedImageDisplayIndex">
                    <div class="flat-image-item"  v-if="selectedImageDisplayIndex === 0">
                        <div class="flat-plan-image-container">
                            <img class="flat-plan-image"/>
                        </div>
                    </div>
                    <div class="flat-image-item"  v-else-if="selectedImageDisplayIndex === 1">

                    </div>
                    <div class="flat-image-item"  v-else-if="selectedImageDisplayIndex === 2">

                    </div>
                </div>  
            </Transition>
            <div class="flat-images-controls">

            </div>
        </div>
        <div class="flat-details-info-container">

        </div>
    </div>
</template>

<style scoped>

.flat-details-container {
    display: flex;
}

.flat-images-container {
    display: flex;
}

.flat-image-inner {
    display: flex;
    justify-content: center;
}
</style>