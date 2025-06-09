<script>
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import EcosystemIcon from './components/icons/IconEcosystem.vue'
  import IconPhone from './components/icons/IconPhone.vue'
  import logo from './assets/logo.png'
  import WelcomeItem from './components/WelcomeItem.vue'
  

  export default {
    components: {
      RouterLink,
      RouterView,
      HelloWorld
    }
  }
</script>

<template> 
  <div class="wrapper">
    <header>
      <img class="logo" src="./assets/logo.png" width="140px"></img>
      <div class="ads">
        <p>Семейная ипотека 3.5%</p>
      </div>

      <nav>
        <RouterLink>Выбор квартир</RouterLink>
        <RouterLink>Способы покупки</RouterLink>
        <RouterLink>Ход строительства</RouterLink>
        <RouterLink>Ещё</RouterLink>
      </nav>  
      
      <div class="phone-number">
        <a>+7 (351) 778-78-00</a>
      </div>

      <div class="icons">     
        <div class="icon">
          <font-awesome-icon icon="phone" size="2xl"/>
        </div>
      <div class="icon">
        <font-awesome-icon icon="heart" size="2xl"/>  
      </div>
       
      </div>
    </header>
  </div>
  <div class="main-body">
      <RouterView />
  </div>

  <footer>
   
  <h1>Getting Started with Vue.js and Font Awesome</h1>
  </footer>
</template>

<style scoped>
header {  
  background-color: var(--vt-c-blue);
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: center;
  color: var(--vt-c-white);
}

footer{
  padding: 10px 6px;
  bottom: 0px;
}

.phone-number {
  margin-left: 25px;
  margin-right: 10px;
  display: inline-block;
  text-decoration: none; /* Убираем подчёркивание */
    border-bottom: 0 solid var(--vt-c-indigo); /* Параметры линии снизу */
    transition: 0.2s; /* Время перехода */
}

.icons {
  display: flex;
   justify-content: center;
   align-items: center;
  width: 32px;
  gap: 10px;
  height: 32px;

}

.icon {
  transition: 0.2s;
}

.logo {
  display: inline-block;
}
.main-body {
    margin: 0 auto;
    width: 80%;
  
}

.ads{
  background-color: var(--vt-c-indigo);
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  transform: rotate(-2deg);
  transition: 0.2s;
}

.ads:hover {
  transform: rotate(-4deg);
}



nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  font-size: 16px;
  position: relative;


}



nav a.router-link-exact-active {
  color: var(--color-text);
  position: relative;
  text-decoration: none; /* Убираем подчёркивание */
  border-bottom: 0 solid var(--vt-c-indigo); /* Параметры линии снизу */
  line-height: 4.8;
  transition: 0.2s; /* Время перехода */
}

nav a.router-link-exact-active:after {
  display: block;
  content: "";
  height: 3px;
  left: 50%;
  width: 0;
  position: absolute;
  background-color: var(--vt-c-indigo);;
  transition: all 0.4s;
}


nav a.router-link-exact-active:hover:after, nav a.router-link-exact-active:focus:after {
  width: 100%;
  left: 0;
}

nav a.router-link-exact-active:hover, .phone-number:hover, .icon:hover {
  color:var(--vt-c-indigo); /* Цвет ссылок при наведении */
}



</style>
