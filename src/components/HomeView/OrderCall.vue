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
              console.log(this.isConfirm);
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
    <div class="main">
        <hr class="order-call-divider"/>
        <div class="order-call-content">
            <div class="order-call-text">
                <p>
                    Узнай больше о своём будущем доме
                </p>  
            </div>
            <div  class="order-call-form">
                    <div class="order-call-form-content">
                        <div class="phone-input" :class="{ 'input-error': !isValid && isValid != null }">
                            <input class="phone-input-value" placeholder="Введите номер телефона" v-model="phoneNumber" @input="formatPhone" maxlength="18"
                                type="tel" @keypress="isNumber($event)" :class="{ 'error-border': !isValid && isValid != null }"></input>
                            <Transition>
                                <p class="error-message" v-if="!isValid && isValid != null">
                                    {{errorMessage}}
                                </p>
                            </Transition>                   
                        </div>
                        <button :disabled="(!isValid && isValid != null) || (isConfirm == false)" @click="orderPhone">Заказать звонок</button>             
                    </div>
                    <div class="custom-checkbox-container">
                        <input type="checkbox" id="checkbox" class="checkbox" :checked="isConfirm" @change="checkConfirm" :class="{ 'input-error': !isConfirm && isConfirm != null,
                            'error-border': !isConfirm && isConfirm != null }"/>
                        <label class="checkbox-text" for="checkbox">
                            <p>Принимаю</p>
                            <RouterLink>политику конфиденциальности</RouterLink>
                            <p> и даю согласие на</p>
                            <RouterLink> обработку персональных данных</RouterLink>
                        </label>
                    </div>
            </div>
        </div>
        <hr class="order-call-divider"/>
    </div>
</template>

<style scoped>

.main{
        padding-left: 10px;
    padding-right: 10px;
    margin-top: 100px;
    min-width: calc(var(--ui-col) * 33);
    width: 80%;
    display: flex;
    flex-direction: column;
}

.main hr {
    border-color: var(--vt-c-light-gray);
}

.order-call-divider {
    width: 100%;
}

.order-call-content {

    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.phone-input {
    display: flex;;
    flex-direction: column;
    align-items: center;
}

.order-call-text {
   width: calc(var(--ui-unit)* 100);
    
      font-weight: 500;
   font-size: var(--font-size-large2);
}

.order-call-form {
 
    width: calc(var(--ui-col)* 15);
    display: flex;
    flex-direction: column;
    justify-content: center;
  
}


.checkbox-text {
    display: flex;
    font-size: var(--font-size-mini);
    gap: 5px;
    justify-content: end;
}


.order-call-form-content {

    display: flex;
    justify-content: end;
    gap: 20px;
    height: calc(var(--ui-unit)*20);
}

.error-message {
    color: var(--vt-c-error);
    font-size: var(--font-size-mini);
}

.order-call-form-content input {
    
    width: 300px;
    height: calc(var(--ui-unit)*12);
    border-radius: 10px;
    text-align: center;
    border-width: 0;
    background-color: var(--vt-c-light-gray);

}

.order-call-form-content input:focus {
    outline: none;
}



.order-call-form-content button {
    border-radius: 10px;
    width: 300px;
    height: calc(var(--ui-unit)*12);
    border-width: 0;
    background-color: var(--vt-c-blue);
    color: var(--vt-c-white);
    transition: 0.2s;
}

.order-call-form-content button:hover {
    background-color: var(--vt-c-light-blue);
    transform: all 0.5 easy;
}
.order-call-form-content button:disabled {
    background-color: var(--vt-c-light-gray);
    color: var(--vt-c-black);
    transform: all 0.5 easy;
}



.custom-checkbox-container {
    gap: 5px;
    width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-checkbox-container a {
    text-decoration: none;
    color: var(--vt-c-blue);
}


.custom-checkbox-container a {
    text-decoration: none;
    color: var(--vt-c-blue);
}

.custom-checkbox-container a:hover {
    text-decoration: underline;
}

.checkbox {
  appearance: none;
  position: relative;
  width: 15px;
  height: 15px;
  background: var(--vt-c-white);
  border-radius: 5px;
  border: 1px solid var(--vt-c-gray);
   transition: 0.2s;
}

.checkbox::after {
  content: "\2714";
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 0px;
  height: 0px;
  font-size: 13px;
  color: var(--vt-c-white);
  background-color: var(--vt-c-blue);
  transition: 0.2s;
  border-radius: 5px;
  overflow: hidden;
}

.checkbox:checked::after {
    border-radius: 4px;
    width: 13px;
      top: -5px;
  left: 2px;
    height: 13px;
    font-size: 13px;
    transition: 0.2s;
}

.checkbox:hover{
    border-color: var(--vt-c-blue) !important;
    background-color: var(--vt-c-light-blue-lighter);
}

.checkbox:active {
    filter: brightness(90%);
}

.v-enter-active{
   transition: all 0.1s ease-out;
}

.v-leave-active {
   transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from, .v-enter, .v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}


.v-enter-active{
   transition: all 0.1s ease-out;
}

.v-leave-active {
   transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.error-border {
  border: 1px solid var(--vt-c-error) !important;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

.input-error {
  animation: shake 0.5s ease-in-out;
}


</style>