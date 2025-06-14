<script>

export default {
    data() {
        return {
            cookieAgree: false
        }
    },
    methods: {
        acceptCookies (){
            localStorage.setItem('accept_cookies', 'true');
            this.cookieAgree = true;
            this.$emit('accept-cookies')
          
        },
        declineCookies() {
            localStorage.setItem('accept_cookies', 'false')
            this.cookieAgree = false;
        },
        checkCookieAgree(){
            if(localStorage.getItem('accept_cookies') == 'true'){
                this.cookieAgree = true;
                this.$emit('accept-cookies')
            }
        }
    },
    mounted() {
        this.checkCookieAgree();
    }
}

</script>

<template>
    <div class="cookie-agree-container"  v-if="!cookieAgree">
        <div class="cookie-agree-content">
            <p>
                Мы используем cookie-файлы, чтобы сайт работал быстрее и удобнее.
                   <a href="dadas">Политика конфиденциальности</a>
            </p>
        </div>
        <div class="agree-buttons">
            <button @click="acceptCookies">
                Понятно
            </button>
            <button @click="declineCookies">
                Отмена
            </button>
        </div>
    </div>
</template>

<style scoped>

.cookie-agree-container {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: var(--vt-c-white);
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    max-width: 420px;
    gap: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.cookie-agree-content {
    display: flex;
    
}

.cookie-agree-content {
    font-size: var(--font-size-normal-mini);
}

.cookie-agree-content a {
    color: var(--vt-c-blue);
    transition: 0.2s;
}

.agree-buttons {
    display: flex;
    justify-content: start;
    gap: 20px;
}

.agree-buttons button {
    background-color: var(--vt-c-blue);
    border-radius: 10px;
    border-width: 0;
    height: 40px;
    width: 120px;
    color: var(--vt-c-white);
    transition: 0.2s;
}

.agree-buttons button:hover {
    background-color: var(--vt-c-light-blue);
    transform: all 0.5 easy;
}

.cookie-agree-content a:hover {
    color:  var(--vt-c-light-blue);
        transform: all 0.5 easy;
}
.v-enter-active{
   transition: all 0.2s ease-out;
    }

  .v-leave-active {
   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .v-enter-from, .v-enter, .v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>