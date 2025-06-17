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
    <div class="order-call-container">
        <hr class="order-call-divider"/>
        <div class="order-call-content">
            <div class="order-call-text">
                <p>
                    Узнай больше о своём будущем доме
                </p>  
            </div>
            <div  class="order-call-form">
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
                        <input type="checkbox" id="checkbox" class="checkbox" :checked="isConfirm" @change="checkConfirm" :class="{ 'input-error': !isConfirm && isConfirm != null,
                            'error-border': !isConfirm && isConfirm != null }"/>
                        <label class="checkbox-text" for="checkbox">
                            <p>Принимаю</p>
                            <RouterLink to="/">политику конфиденциальности</RouterLink>
                            <p> и даю согласие на</p>
                            <RouterLink to="/"> обработку персональных данных</RouterLink>
                        </label>
                    </div>
            </div>
        </div>
        <hr class="order-call-divider"/>
    </div>
</template>

<style scoped>


.order-call-container{
    padding-left: 10px;
    padding-right: 10px;
    min-width: calc(var(--ui-col) * 33);
    width: 60%;
    display: flex;
    flex-direction: column;
}

.order-call-container hr {
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

}

.order-call-text {
   width: 40%;
   font-weight: 500;
   font-size: var(--font-size-large2);
}

.order-call-form {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  
}



.order-call-form-content {

    display: flex;
    justify-content: end;
    gap: 20px;
    padding-bottom: 2rem;

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




 @media (max-width: 1340px) {
    .order-call-container{
      width: 100%;
      min-width: 100%;
    }
  }

@media (max-width: 900px) {

    .checkbox-text {
        white-space: nowrap;
        flex-wrap: wrap;
    }

    .order-call-text {
        font-size: var(--font-size-normal3);
        width: 80%;
    }

    .order-call-content {
        width: 100%;
        flex-direction: column;
         padding-top: 20px;
        padding-bottom: 25px;
        gap: 20px;
           color: var(--vt-c-dark-indigo);
    }

    .order-call-container {
        min-width: 100%;
        flex-direction: column;
    }

    .order-call-form-content {
        width: 100%;
       
        flex-direction: column;
       
    }

    .order-call-form {
        gap: 20px;
        padding-bottom: 0;
         width: 100%;;
    }

    .order-call-form-content input, .order-call-form-content button {
        width: 100%;
    }

    .custom-checkbox-container{
        align-items: start;
      
    }

    .checkbox {
        margin-top: 2px;
        min-width: 15px;
    }

    .order-call-form-content {
       padding-bottom: 0;
    }
}


</style>