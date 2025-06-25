<script>
export default {

    data() {
        return {
            drawerOpened: false,
            phoneNumber: '',
            name: '',
            isValidPhone: null,
            isValidName: null,
            isConfirm: null,
            errorMessageName: 'Имя не должно быть пустым',
            errorMessagePhone: 'Неверный номер телефона'
        }
    },
    methods: {
        openDrawer(){
            this.drawerOpened = true;
        },
        closeDrawer(){
            this.drawerOpened = false;
        },
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
            this.isValidPhone = cleanPhoneNumber.length === 11 && cleanPhoneNumber.startsWith('7');
        },
        formatName(event) {
            this.validateName();
        },
        validateName() {

            this.isValidName = this.name.length > 0 && this.name != '';
        },
        checkConfirm(){
   
            if(this.isConfirm == null){
                this.isConfirm = true;
            }
            else{
                this.isConfirm = !this.isConfirm;
            }
             
        },
        orderConsultation(){
            if(this.isValidPhone == true && this.isValidName == true && this.isConfirm == true){
                alert("Консультация заказана")
            }
            else{
                this.validatePhone();
                this.validateName();
            }
        }
    },
    created() {

      
    }
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
                         <div class="validation-input" :class="{ 'input-error': !isValidName && isValidName != null }">
                            <label class="input-label">Имя</label>
                            <input class="input-text" placeholder="Введите имя" v-model="name" maxlength="20" @input="formatName"
                                type="text" :class="{ 'error-border': !isValidName && isValidName != null }"></input>
                            <Transition>
                                <p class="error-message" v-if="!isValidName && isValidName != null">
                                    {{errorMessageName}}
                                </p>
                            </Transition>                   
                        </div>
                         <div class="validation-input" :class="{ 'input-error': !isValidPhone && isValidPhone != null }">
                            <label class="input-label" >Телефон</label>
                            <input class="input-text" placeholder="Введите номер телефона" v-model="phoneNumber" @input="formatPhone" maxlength="18"
                                type="tel" @keypress="isNumber($event)" :class="{ 'error-border': !isValidPhone && isValidPhone != null }"></input>
                            
                                <p class="error-message" v-if="!isValidPhone && isValidPhone != null">
                                    {{errorMessagePhone}}
                                </p>
                                           
                        </div>
                    </div>
                    <div class="send-container">
                        <hr/>
                        <input type="button" class="form-button" @click="orderConsultation" :disabled="(!isValidPhone && isValidPhone != null) || (!isValidName && isValidName != null) || (isConfirm == false)" value="Отправить"></input>
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
    height: 100%;
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
.validation-input {
    justify-content: start;
    align-items: start;
    width: 100%;
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
    width: 100%;
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
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
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

  @media (max-width: 900px) {
    .drawer-back {
        padding: 0;
        width: 100%;
        border-radius: 0;
         min-width: 100%;
    }

    .drawer {
        border-radius: 0;
        padding: 18px 12px;
    }

    .drawer-title {
        font-size: var(--font-size-normal2);
        width: 100%;
    }

    .icon-hollow {
        margin-top: 15px;
        margin-right: 15px;
    }
  }

</style>