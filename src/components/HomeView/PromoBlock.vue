<script>
export default {
    data(){
        return {

        }
    },
    props: {
        icon: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        buttonTitle: {
            type: String,
            required: true
        }
    },
    inject: ['openConsultationRequestDrawer'],
    methods: {
         openDrawer() {
            this.openConsultationRequestDrawer();
        }
    }
}
</script>

<template>
    <div class="promo-block-container">
        <div class="promo-block-content">
            <div class="icon-container">
                <font-awesome-icon :icon="icon" size="2xl"/> 
            </div>
            <div class="text-container">
                <div class="title">
                    <p>{{title}}</p>
                </div>
                <div class="description">
                    <p>{{description}}</p>
                </div>
            </div>
        </div>
        
        <div class="button-container">
            <button @click="openDrawer">{{buttonTitle}}</button>
        </div>
    </div>
</template>

<style scoped>

.promo-block-container {
    width: 60%;
    border-radius: 2rem;
    min-width: calc(var(--ui-col) * 33);
    background-color: var(--vt-c-blue);
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding: 2.5rem 4rem;
}

.promo-block-content {
    display: flex;
    gap: 2.5rem;
    align-items: center;
    
    color: var(--vt-c-white);
 
}
.text-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    line-height: 1;
}
.icon-container {
    background-color: var(--vt-c-dark-blue);
    min-width: 5.5rem;
    height: 5.5rem;
    border-radius: 4rem;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: var(--font-size-mini2);
}

.title {
    font-size: var(--font-size-large);
    font-weight: 500;
    text-align: left;
}

.description {
    color: var(--vt-c-light-gray2);
    opacity: 0.8;
}
.button-container {
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: end;
}

.button-container button{
    width: 10rem;
    font-size: var(--font-size-normal-mini);
    height: 3rem;
    border-width: 0;
    border-radius: 0.5rem;
    color: var(--vt-c-blue);
    transition: 0.2s;
}

.button-container button:hover{
    background-color: var(--vt-c-white-blue);
    transition: all 0.5 easy;
}

 @media (max-width: 900px) {
    .promo-block-container {
      
        gap: 50px;
        padding: 20px;
        min-width: 95%;
        flex-direction: column;
        justify-content: start;
         align-items: start;
    }
    .promo-block-content {
        gap: 15px;
        flex-direction: column;
         justify-content: start;
         align-items: start;
    }

    .icon-container {
        min-width: 70px;
        height: 70px;
    }
   
     .button-container button{
        width: 100%;
    }

    .title {
        font-size: var(--font-size-normal2);
    }
    .description {
        font-size: var(--font-size-normal-mini);
        line-height: 1.5;
    }
 }
</style>