<script>
import lozad from 'lozad';

export default {
    props: {
        backgroundColor: {
            type: String,
            default: "#efefef"
        },
        height: {
            type: Number,
            default: null
        },
        lazySrc: {
            type: String,
            default: null
        },
        lazySrcset: {
            type: String,
            default: null
        },
        width: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            loading: true
        }
    },
    computed: {
        aspectRatio() {
            if(!this.width || !this.height) return null;
            return (this.height / this.width) * 100;
        },
        style() {
            const style = { backgroundColor: this.backgroundColor};

            if(this.width) style.width = `${this.width}px`;

            const applyAspectRatio = this.loading && this.aspectRatio;
            if(applyAspectRatio) {
                style.height = 0;
                style.paddingTop = `${this.aspectRatio}%`;
            }
            return style;
        }
    },
    mounted() {
        const setLoadingState = () => {
            this.loading = false;
        };

        this.$el.addEventListener("load", setLoadingState);

        const observer = lozad(this.$el,{
            rootMargin: '10px 0px', // syntax similar to that of CSS Margin
            threshold: 0.1, // ratio of element convergence
            enableAutoReload: true});
            observer.observe();
    },
    beforeDestroy() {
        this.$el.removeEventListener("load", setLoadingState);
    }
    
}
</script>

<template>
    <img :data-src="lazySrc" :data-srcset="lazySrcset" :style="style" class="lazy-image"/>

</template>

<style scoped>
.lazy-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    vertical-align: middle;
}
</style>