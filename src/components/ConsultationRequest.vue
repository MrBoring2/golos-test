<script>
export default {

    data() {
        return {
            drawerOpened: false
        }
    },
    methods: {
        openDrawer(){
            this.drawerOpened = true;
        },
        closeDrawer(){
            this.drawerOpened = false;
        }
    },
    created() {

        console.log(this.constultationRequestDrawerOpend)
    },
    inject: ['constultationRequestDrawerOpend']
}
</script>

<template>
    <Transition>
        <div class="consultation-request-container" v-if="drawerOpened">
        <div class="overlay"></div>
        <div class="drawer-back">
            <div class="drawer">
                <div class="icon-hollow" @click="closeDrawer">
                <font-awesome-icon class="close-icon" icon="fa-solid fa-close" size="2xl"/> 
                </div>
                    <div class="drawer-title">
                    <p>Заявка на консультацию</p>
                    </div>                  
                    <form class="constultation-request-form">
                    <div class="inputs-container">
                        <div class="input-container">
                            <label class="input-label">Имя</label>
                            <input class="input-text" placeholder="Введите имя" v-model="phoneNumber" @input="formatPhone" maxlength="18"
                                type="tel" @keypress="isNumber($event)" :class="{ 'error-border': !isValid && isValid != null }"></input>
                        </div>
                        <div class="input-container">
                        <label class="input-label">Телефон</label>
                        <input class="input-text" placeholder="Введите номер телефона" v-model="phoneNumber" @input="formatPhone" maxlength="18"
                                type="tel" @keypress="isNumber($event)" :class="{ 'error-border': !isValid && isValid != null }"></input>
                        </div>
                    </div>
                    <div class="send-container">
                        <hr/>
                        <input type="button" class="form-button" :disabled="(!isValid && isValid != null) || (isConfirm == false)" value="Отправить"></input>
                        <div class="custom-checkbox-container">
                        <input type="checkbox" id="checkbox" class="checkbox" :checked="isConfirm" @change="checkConfirm" :class="{ 'input-error': !isConfirm && isConfirm != null,
                            'error-border': !isConfirm && isConfirm != null }"/>
                        <label class="checkbox-text" for="checkbox">
                            <p>Принимаю</p>
                            <RouterLink to="/about">политику конфиденциальности</RouterLink>
                            <p> и даю согласие на</p>
                            <RouterLink to="/about"> обработку персональных данных</RouterLink>
                        </label>
                    </div>
                    </div>
                </form>
        </div>
    </div>
    </div>
    </Transition>
    
</template>

<style scoped>
.consultation-request-container {
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 100vh;
}

.overlay {
    background: black;
    position: absolute;
     width: 100%;
    height: 100%;
    opacity: 0.5;
}

.drawer-back {
    right: 0;
    position: absolute;
    height: 100%;
    min-width: calc(var(--ui-unit)*120);
    width: 30%;
    padding: 20px;
}

.drawer {
    border-radius: 20px;
    background-color: var(--vt-c-white);
    height: 100%;
    right: 0;
    gap: 20px;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    
}

.close-button {

}

.drawer-content {
  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.constultation-request-form {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.inputs-container {
    display: flex;
    gap: 30px;
    height: 100%;
    flex-direction: column;
}
.input-container {
    display: flex;
      flex-direction: column;
}

.drawer-title {
    font-size: var( --font-size-large);
    font-weight: 500;
    width: 50%;
}

.input-text {
    text-align: start;
    padding-left: 20px;
}

.input-label{
    font-size: var(--font-size-mini);
    color: var(--vt-c-gray);
}

.form-button {
    width: 100%;
}

.send-container{
    gap: 10px;
    display: flex;
    flex-direction: column;
}

.send-container hr {
    margin-left: -50px;
    margin-right: -50px;
    border: none;
    border-top: 1px solid;
    border-color: var(--vt-c-light-gray2);
    border-width: 1px;
  
}

.checkbox {
    margin-top: 2px;
}
.custom-checkbox-container{
    align-items: start;
}
.checkbox-text {
    font-size: var(--font-size-mini);
    flex-wrap: wrap;
}
.icon-hollow {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 50px;
    margin-right: 50px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-active .drawer-back,
.v-leave-active .drawer-back {
  transition: transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-from .drawer-back,
.v-leave-to .drawer-back {
  transform: translateX(100%);
}

</style>