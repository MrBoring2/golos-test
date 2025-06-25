<script>
import { RouterLink } from 'vue-router';
export default{
    data() {
        return {
            phoneNumber: '',
            isValid: null,
            isConfirm: null,
            errorMessage: 'Неверный номер телефона'
        }
    },
    methods: {
        isNumber(evt) {
        evt = evt || window.event;
        const charCode = evt.which ? evt.which : evt.keyCode;
        if ((charCode < 48 || charCode > 57)) {
            evt.preventDefault();
        }  else {
            return true;
            }
        },
        formatPhone(event) {
            const x = event.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            this.phoneNumber = !x[2] ? '+7' : `+7 (${x[2]}${x[3] ? `) ${x[3]}` : ''}${x[4] ? `-${x[4]}` : ''}${x[5] ? `-${x[5]}` : ''}`;
            this.validatePhone();
        },
        validatePhone(){
            const cleanPhoneNumber = this.phoneNumber.replace(/\D/g, '');
            this.isValid = cleanPhoneNumber.length === 11 && cleanPhoneNumber.startsWith('7');
        },
        checkConfirm(){
   
            if(this.isConfirm == null){
                this.isConfirm = true;
            }
            else{
                this.isConfirm = !this.isConfirm;
            }
        },
        orderPhone(){
            if(this.isValid == true && this.isConfirm == true){
                alert("Звонок заказан")
            }
            else{
                this.validatePhone();
            }
        }
    }
}

</script>

<template>
    <div class="any-questions-container">
        <div class="any-questions-content">
            <div class="any-questions-title-container">
                <p class="any-questions-title">
                    Остались вопросы?
                </p>
                <p class="any-questions-subtitle">
                    <p>Мы перезвоним и обсудим все детали</p>
                </p>
            </div>
            <div class="order-call-form">
                    <div class="order-call-form-content">
                        <div class="validation-input" :class="{ 'input-error': !isValid && isValid != null }">
                            <input class="input-text" placeholder="Введите номер телефона" v-model="phoneNumber" @input="formatPhone" maxlength="18"
                                type="tel" @keypress="isNumber($event)" :class="{ 'error-border': !isValid && isValid != null }"></input>
                            <Transition>
                                <p class="error-message" v-if="!isValid && isValid != null">
                                    {{errorMessage}}
                                </p>
                            </Transition>                   
                        </div>
                        <button class="form-button" :disabled="(!isValid && isValid != null) || (isConfirm == false)" @click="orderPhone">Заказать звонок</button>             
                    </div>
                    <div class="custom-checkbox-container">
                        <input type="checkbox" id="checkbox_bottom" class="checkbox" :checked="isConfirm" @change="checkConfirm" :class="{ 'input-error': !isConfirm && isConfirm != null,
                            'error-border': !isConfirm && isConfirm != null }"/>
                        <label class="checkbox-text" for="checkbox_bottom">
                            <p>Принимаю</p>
                            <RouterLink to="/">политику конфиденциальности</RouterLink>
                            <p> и даю согласие на</p>
                            <RouterLink to="/"> обработку персональных данных</RouterLink>
                        </label>
                    </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.any-questions-container {
    width: 100%;

    background-color: var(--vt-c-blue);
    display: flex;
    align-items: center;
    justify-content: center;
  
}
.any-questions-title-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.any-questions-title {
    font-size: var( --font-size-large4);
    font-weight: 500;
}
.any-questions-subtitle {
    color: var(--vt-c-middle-gray);
}

.any-questions-content {
    min-width: calc(var(--ui-col) * 32.5);
    width: 60%;
    background-color: var(--vt-c-white);
    padding: 60px 40px;
    margin: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 30px;
    gap: 40px;
}

.order-call-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
}

.order-call-form-content {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

 @media (max-width: 900px) {
    .any-questions-content{
           min-width: 100%;
           width: 100%;     
    }
    .any-questions-container {
        padding: 0 10px;
    }
    .any-questions-subtitle {
        font-size: var(--font-size-mini);
    }
    .order-call-form-content {
        flex-direction: column;
    }
    .checkbox-text {
        display: flex;
        flex-wrap: wrap;
    }
    .any-questions-title {
        font-size: var(--font-size-normal4);
    }
    .checkbox-text {
        font-size: var(--font-size-mini2);
    }
    .checkbox {
        margin-top: -15px;
    }
 }
</style>