<script>
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import EcosystemIcon from './components/icons/IconEcosystem.vue'
  import IconPhone from './components/icons/IconPhone.vue'
  import logo from './assets/logo.png'
  import WelcomeItem from './components/WelcomeItem.vue'
  

  export default {
    data() {
      return{
      activeMenuIndex: null,
      showModal: false,
      menuItems: [
        {name: "Выбор квартир"},
        {name: "Способы покупки"},
        {name: "Ход строительства"},
        {name: "Ещё"}
      ]
      };
    },

    methods: {
      setActiveSubMenu(index) {
          this.activeMenuIndex = index;
      },
      closeMenuIfNotHovered(index){
        if(this.activeMenuIndex == index){
            this.activeMenuIndex = null;    
        }
      },
      keepSubMenuOpen(index) {
        if(index == 0 || index == 3){
        this.activeMenuIndex = index;
        }
      }
    },

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
      <div class="header">
      <div>
        <img class="logo" src="./assets/logo.png" width="150px"></img>
      </div>
      <nav>
        <div class="ads">
          <p>Семейная ипотека 3.5%</p>
        </div>
        <RouterLink v-for="(item, index) in menuItems"  :key="index" 
          @mouseenter="setActiveSubMenu(index)">{{item.name}}</RouterLink>
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
   
      </div> 
       <div class="divider">
        <hr>
      </div>
       <Transition >
        <div class="wraper-sub-menu"   v-if="activeMenuIndex === 0">
          <nav class="sub_menu" @mouseenter="keepSubMenuOpen(0)"
            @mouseleave="activeMenuIndex = null">
              <RouterLink>Выбор по параметрам</RouterLink>
              <RouterLink>Выбор с генплана</RouterLink>
          </nav>    
        </div>  
    </Transition>
    <Transition>
      <div class="wraper-sub-menu"  v-if="activeMenuIndex === 3" >
          <nav class="sub-menu" @mouseenter="keepSubMenuOpen(3)"
          @mouseleave="activeMenuIndex = null">
              <RouterLink>О застройщике</RouterLink>
              <RouterLink>Контакты</RouterLink>
      </nav> 
      </div>
      
    </Transition>
    </header> 
  </div>
  <div class="main-body">
    <div class="container">
      <RouterView />
    </div>
  </div>
  
  <footer>
    <div class="footer-container">
      <div class="footer-media">
          <div class="golos-info">
              <div>
                <img class="logo" src="./assets/logo.png" width="150px"></img> 
              </div>
               
             <div class="phone-number-footer">
              <a>+7 (351) 778-78-00</a>
             </div>                
          </div>
          <div class="golos-media">
            <div class="footer-icon">
              <font-awesome-icon icon="fa-brands fa-vk" size="2xl"/>  
            </div>
            <div class="footer-icon">
              <font-awesome-icon icon="fa-brands fa-telegram" size="2xl"/>  
            </div>
            <div class="footer-icon">
             <font-awesome-icon icon="fa-brands fa-youtube" size="2xl"/>  
            </div>
          </div>
      </div>
      <div class="footer-divider">
        <hr>
      </div>

      <div class="footer-components-production">
        <div class="confidence">
          <nav class="confidence-content">
              <RouterLink>Информированное согласие пользователя сайта</RouterLink>
              <RouterLink>Политика в отношении обработки персональных данных</RouterLink>
              <RouterLink>Политика конфиденциальности</RouterLink>
          </nav>
        </div>
        <div class="copyrite-info">
          <div class="copyrite">
            <p>
            Любая информация, представленная на данном сайте, носит исключительно информационный характер, не является публичной офертой, определяемой положениями статьи 437 ГК РФ.
          </p>
          <p><br></p>
          <p>
            *ООО СЗ "Голос.Кашириных". Проектная декларация на сайте наш.дом.рф. ИНН 7448218436. Скидка 10% применяется при 100% оплате квартиры в течение месяца с момента заключения договора. Срок проведения акции с 11.12.2024 по 30.04.2025 включительно. Не является публичной офертой. Все подробности уточняйте в отделе продаж по номеру телефона +7 (351) 77-88-700
          </p>
          </div>
          <div class="developer">
            <p>Разработано для практики</p>
          </div>         
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

.wrapper {
  top:0;
  position: sticky;
  background-color: var(--vt-c-blue);

}
.wraper-sub-menu{
  position: fixed;
  width: 100vw;
  min-width: 1300px;
  color: var(--vt-c-white);
  background-color: var(--vt-c-blue);

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



.sub-menu {
  justify-content: center;
   transition: opacity 0.5s linear;
}


.header {  
  display: flex;
  gap: 60px;
  align-items: center;
  justify-content: center;
  color: var(--vt-c-white);

}

footer{
  width: 100%;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  background-color: var(--vt-c-blue);
}

.footer-container {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
 
}

.footer-divider {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;
}

.divider hr {
  border-color: var(--vt-c-light-blue);
}

.footer-divider hr {
  border-color: var(--vt-c-light-blue);
}
.footer-components-production{
  width: 1280px;
  
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 80px;
}

.confidence {
  flex-wrap: wrap;
  display: flex;
  justify-content: start;
  
}
.confidence-content {
  color: var(--vt-c-light-blue-lighter);
  font-size: 13px;
}
.copyrite-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.copyrite{
color: var(--vt-c-light-blue-lighter);
  font-size: 13px;
  width: 620px;
}

.developer {
  color: var(--vt-c-light-blue-lighter);
}


.footer-media{
  color: var(--vt-c-white);
  width: 1280px;
   display: flex;
   align-items: center;
   gap: 150px;
   justify-content: space-between;
   
}
.golos-info {
  display: flex;
  gap: 150px;
  align-items: center;
}
.golos-media{
  font-size: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.phone-number-footer {

}

.phone-number {
   text-decoration: none;
    border-bottom: 0 solid var(--vt-c-indigo);
    transition: 0.2s;
    margin-left: 10px;
    font-size: 17px;
    white-space: nowrap;
}

.icons {
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.footer-icon {
  
}

.logo {
  left: 0;
  padding-left: 10px; 
}

.main-body{

  display: flex;
  justify-content: center;
}

.container {


  display: flex;
  flex-direction: column; /* Располагаем элементы вертикально */
  min-height: 100vh;
}

.ads{
  font-size: 15px;
  background-color: var(--vt-c-indigo);
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  transform: rotate(-2deg);
  transition: 0.2s;
  white-space: nowrap;
}

.ads:hover {
  transform: rotate(-4deg);
}



nav {

  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: nowrap;
  white-space: nowrap;
  align-items: center;
  font-size: 16px;
  position: relative;


}



nav a.router-link-exact-active {
  color: var(--color-text);
  position: relative;
  text-decoration: none;
  border-bottom: 0 solid var(--vt-c-indigo);
  line-height: 4.8;
  transition: 0.2s;
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
