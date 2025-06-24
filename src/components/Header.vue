<script>
import { RouterLink, RouterView } from 'vue-router'
import eventBus from '@/scripts/event-bus'
import logo from './../assets/images/logo.webp'
export default {
    data() {
        return {
            logo: logo,
            activeMenuIndex: null,
            showModal: false,
            menuItems: [
                {name: "Выбор квартир"},
                {name: "Способы покупки"},
                {name: "Ход строительства"},
                {name: "Ещё"}
            ],
            mobileMenuItems: [
              {name: "Выбор квартир"},
              {name: "Способы получения"},
              {name: "Ход строительства"},
              {name: "О застройщике"},
              {name: "Контакты"}
            ],
            mobileDrawerOpen: false,
            activeLink: null
        }
    },
    mounted() {
         console.log('Available refs:', Object.keys(this.$refs));
    },
    methods: {
        setActiveSubMenu(index) {
            this.activeMenuIndex = index;
        },
        closeMenuIfNotHovered(index){
            if(this.activeMenuIndex == index) {
                this.activeMenuIndex = null;    
            }
        },
        keepSubMenuOpen(index) {
            if(this.activeMenuIndex == index &&  (index == 0 || index == 3)) {
                this.activeMenuIndex = index;
            }
        },
        openMobileMenuDrawer(){
          this.mobileDrawerOpen = !this.mobileDrawerOpen;
        },
        closeMobileMenu() {
          this.mobileDrawerOpen = false;
        },
          scrollToElement(sectionId) {
             eventBus.$emit('scroll-to', sectionId)
             if(this.mobileDrawerOpen == true) this.mobileDrawerOpen = false;

        },
        closeSubMenu(){
          console.log('act')
          this.activeMenuIndex = null
        },
        
        
        setLinkActive(link){
          this.activeLink = link
        }
    }
}
</script>

<template>
    <div class="wrapper">
        <header>
          <Transition>
            <div class="mobile-menu-drawer" v-if="mobileDrawerOpen">
              <div class="mobile-menu-header">
                <div>
                    <img class="logo" :src="logo" height="30px"></img>
                </div>
                <div class="moblie-menu-header-icons">
                  <font-awesome-icon class="icon" icon="fa-regular fa-heart" size="2xl"/>  
                  <font-awesome-icon class="icon" icon="close" size="2xl" @click="openMobileMenuDrawer"/>  
                </div>
              </div>
              <div class="mobile-menu-content">
                <div class="ipoteca-moblie-phone">
                        <font-awesome-icon icon="percent" size="xs"/>
                        <p>Семейная ипотека 3.5%</p>
                </div>
                <nav>
                      <div class="mobile-menu-nav-item">
                        <RouterLink to="/flats" :class="{ 'active': activeLink == 'flats'}" @mousedown="setLinkActive('flats')" @click="closeMobileMenu">
                          Выбор квартир
                        </RouterLink>
                      </div>
                      <div class="mobile-menu-nav-item">
                        <RouterLink :to="{ path: '/', hash: '#ipoteca-variants' }" :class="{ 'active': activeLink == 'ipoteca-variants'}" @mousedown="setLinkActive('ipoteca-variants')" @click="closeMobileMenu">
                          Способы получения
                       </RouterLink>
                        </div>
                      <div class="mobile-menu-nav-item">
                           <RouterLink to="/" @click="closeMobileMenu">
                          Ход строительства
                      </RouterLink>
                      </div>
                     <div class="mobile-menu-nav-item">
                        <RouterLink :to="{ path: '/', hash: '#about-the-builder' }" :class="{ 'active': activeLink == 'about-the-builder'}" @mousedown="setLinkActive('about-the-builder')" @click="closeMobileMenu">
                          О застройщике
                      </RouterLink>  
                      </div>
                     <div class="mobile-menu-nav-item">
                        <RouterLink to="/" @click="closeMobileMenu">
                          Контакты
                      </RouterLink>
                       </div>       
                </nav>
              </div>
              <div class="mobile-menu-footer">
                <div class="mobive-footer-media">
                    <div class="mobile-phone-number">
                      <font-awesome-icon class="icon" icon="phone" size="xl"/>
                      <a>+7 (351) 778-78-00</a>
                   </div>
                   <div>
                    <div class="golos-footer-media">
                      <div class="footer-icon">
                        <font-awesome-icon class="icon" icon="fa-brands fa-vk" size="2xl"/>  
                      </div>
                      <div class="footer-icon">
                        <font-awesome-icon class="icon" icon="fa-brands fa-telegram" size="2xl"/>  
                      </div>
                      <div class="footer-icon">
                        <font-awesome-icon class="icon" icon="fa-brands fa-youtube" size="2xl"/>  
                      </div>
                </div>
                   </div>
                </div>
                <div class="confidence">
                  <a>Политика конфиденциальности</a>
                </div>
                 <div class="copyrite">
                  <p>
                    ЖК «Голос Кашириных», {{new Date().getFullYear()}}
                  </p>
                 </div>
              </div>
            </div>
          </Transition>
            <div class="main-menu-container">
                <div>
                    <img class="logo" :src="logo" width="150px"></img>
                </div>
                <nav class="main-menu">
                    <div class="ipoteca">
                        <font-awesome-icon icon="percent" size="xs"/>
                        <p>Семейная ипотека 3.5%</p>
                    </div>
                    <RouterLink to="/flats" @mouseenter="setActiveSubMenu(0)" :class="{ 'nav-active': activeMenuIndex == 0, 'active': activeLink == 'flats'}" @mousedown="setLinkActive('flats')">
                          Выбор квартир
                      </RouterLink>
                      <RouterLink :to="{path: '/', hash: '#ipoteca-variants'}"  @mouseenter="setActiveSubMenu(1)" :class="{ 'active': activeLink == 'ipoteca-variants'}" @mousedown="setLinkActive('ipoteca-variants')">
                          Способы получения
                      </RouterLink>
                      <RouterLink to="/"  @mouseenter="setActiveSubMenu(2)" :class="{ 'active': activeLink == 'building-plan'}" @mousedown="setLinkActive('building-plan')">
                          Ход строительства
                      </RouterLink>
                      <RouterLink to="/"  @mouseenter="setActiveSubMenu(3)" :class="{ 'nav-active': activeMenuIndex == 3}">
                          Ещё
                      </RouterLink>
                </nav> 
                <div class="header-media">
                  <div class="phone-number">
                    <a>+7 (351) 778-78-00</a>
                  </div>
                  <div class="icons">     
                    <font-awesome-icon class="icon" icon="phone" size="xl"/>
                    <font-awesome-icon class="icon" icon="fa-regular fa-heart" size="xl"/>  
                    <font-awesome-icon class="icon-humberger" icon="bars" size="2xl" @click="openMobileMenuDrawer"/>
                  </div>   
                </div>   
            </div> 
            
        </header> 
        <div class="divider">
           <hr>
        </div>
        <Transition >
            <div class="wraper-sub-menu"   v-if="activeMenuIndex === 0">
                    <nav class="sub-menu" @mouseenter="keepSubMenuOpen(0)"
                        @mouseleave="closeSubMenu">
                            <RouterLink to="/flats" :class="{ 'active': activeLink == 'flats'}" @mousedown="setLinkActive('flats')">Выбор по параметрам</RouterLink>
                            <RouterLink to="/">Выбор с генплана</RouterLink>
                    </nav>    
                </div>  
            </Transition>
            <Transition>
                <div class="wraper-sub-menu"  v-if="activeMenuIndex === 3" >
                    <nav class="sub-menu" @mouseenter="keepSubMenuOpen(3)"
                        @mouseleave="closeSubMenu">
                    <RouterLink  :to="{ path: '/', hash: '#about-the-builder' }" @mousedown="setLinkActive('about-the-builder')" :class="{ 'active': activeLink == 'about-the-builder'}">О застройщике</RouterLink>
                    <RouterLink to="/" :class="{ 'active': activeLink == 'contacts'}" >Контакты</RouterLink>
                    </nav> 
                </div>
            </Transition>
    </div>
</template>

<style scoped>
.wrapper {
  
  height: var(--header-heigth);
  top:0;
  z-index: 1000;
  position: sticky;
  background-color: var(--vt-c-blue);
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

}

header {
    min-width: calc(var(--ui-col)* 33);
    height: var(--header-heigth);
    display: flex;
    width: 60%;
    justify-content: center;
   
}

.main-menu-container {
   min-width: calc(var(--ui-col)* 33);
   width: 100%;
  padding: 12px 12px 12px 12px;
  display: flex;

 
  align-items: center;
  justify-content: space-between;
  
  color: var(--vt-c-white);

}

.logo {
  min-height: 50px;
  height: 3.5rem;
  width: auto;
}

nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: nowrap;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-normal);
  position: relative;
}

nav a {
  color: var(--vt-c-white);
  position: relative;
  text-decoration: none;
  border-bottom: 0 solid var(--vt-c-indigo);

  transition: 0.2s;
}

nav a:hover:after, nav a:after {
  width: 100%;
  left: 0;
}


nav a:hover, .phone-number:hover, .icon:hover, .icon-humberger:hover {
  color:var(--vt-c-indigo);
  transform: all 0.5 easy;
}

.nav-active{
  color: var(--vt-c-indigo);
  position: relative;
  text-decoration: none;
  border-bottom: 0 solid var(--vt-c-indigo);

  transition: 0.2s;
}
.nav-active:after {
  display: block;
  content: "";
  height: 5px;
  width: 0;
  position: absolute;
  background-color: var(--vt-c-black);;
}

.header-media {
  gap: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-humberger{
  display: none;
}

.active {
  color: var(--vt-c-indigo);
  position: relative;
  text-decoration: none;
  border-bottom: 0 solid var(--vt-c-indigo);

  transition: 0.2s;
}
.active:after {
  display: block;
  content: "";
  height: 3px;
  width: 100% !important; /* Фиксированная ширина (вместо 0) */
  left: 0 !important; /* Выравнивание по левому краю (вместо 50%) */
  position: absolute;
  bottom: calc(var(--header-heigth) / -2 + 0.5em);
  background-color: var(--vt-c-indigo);
  transition: none; /* Убираем анимацию, если нужно статичное подчёркивание */
}


.main-menu a:after{
  display: block;
  content: "";
  height: 3px;
  left: 50%;
  width: 0;
  z-index: 1002;
  bottom: calc(var(--header-heigth) / -2 + 0.5em);
  position: absolute;
  background-color: var(--vt-c-indigo);;
  transition: all 0.4s;
}

.ipoteca{
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: var(--font-size-normal);
  background:  radial-gradient(circle,rgba(31, 86, 157, 1) 0%, rgba(48, 48, 54, 1) 74%);
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  transform: rotate(-2deg);
  transition: 0.2s;
  white-space: nowrap;
}


.ipoteca:hover, .ipoteca-moblie-phone:hover {
  transform: rotate(-4deg);
}

.phone-number {
  text-decoration: none;
  border-bottom: 0 solid var(--vt-c-indigo);
  transition: 0.2s;
  margin-left: 10px;
  font-size: var(--font-size-normal);
  white-space: nowrap;
}

.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.icon {
    transition: 0.2s;
     color: var(--vt-c-white);
}

.divider hr {
  border-color: var(--vt-c-light-blue);
  width: 100%;
  z-index: 1001;
  position: absolute;
  left: 0;
}

.wraper-sub-menu{
  margin-top: var(--header-heigth);
  height: var(--header-heigth);
  position: absolute;
  width: 100%;
  min-width: calc(var(--ui-col) * 32);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vt-c-white);
  background-color: var(--vt-c-blue);

}

.sub-menu {
  width: 100%;
  height: 100%;
}

.sub-menu a:after{
  width: 0% !important;
  left: 0;
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


.mobile-menu-drawer {
  position: fixed;
 ;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: var(--vt-c-dark-gray);
}

.mobile-menu-header {
  display: flex;
  padding: 15px;
  box-shadow: 0 2px 10px -2px gray;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid;
  border-width: 1px;
  border-color: var(--vt-c-gray-blue);
}
.moblie-menu-header-icons{
  display: flex;
  gap: 10px;
}

.mobile-menu-nav-item {
  width: 100%;
  border-top: solid;
  border-color: var(--vt-c-gray-blue);
  border-width: 1px;
  padding-bottom: 20px;
   padding-top: 20px;

}
.mobile-menu-content {
 
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
}

.mobile-menu-content nav {
    display: flex;
    width: 100%;
    gap: 0;
    justify-content: start;
    flex-direction: column;
    align-items: start;
    padding-top: 40px;
}

.mobile-menu-content nav a {
    line-height: 1;
    width: 100%;
}

.ipoteca-moblie-phone {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: var(--font-size-normal);
  background:  radial-gradient(circle,rgba(31, 86, 157, 1) 0%, rgba(48, 48, 54, 1) 74%);
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  transform: rotate(-2deg);
  transition: 0.2s;
  white-space: nowrap;
  color: var(--vt-c-white);
}

.mobile-menu-footer {
  padding: 20px;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap:20px;
  width: 100%;
}

.mobile-phone-number {
     text-decoration: none;
  border-bottom: 0 solid var(--vt-c-indigo);
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--vt-c-white);
  font-size: var(--font-size-normal);
  white-space: nowrap;
  }


  .mobive-footer-media {
    display: flex;
    justify-content: space-between;
  }

  .golos-footer-media {
    display: flex;
    gap: 15px;
  }

    .confidence {
    color: var(--vt-c-white);
    text-decoration: underline;
    font-size: var(--font-size-mini);
  }
  .copyrite {
     color: var(--vt-c-gray);
       font-size: var(--font-size-mini);
  }

  
/*для планшетов и меньше*/

@media (max-width: 900px) {
  .icon-humberger {
    display: block;
  }
  .phone-number, .main-menu, .wraper-sub-menu, .divider  {
    display: none;
  }

  header {
     min-width: 100%;
  }

  .icons {
    font-size: var(--font-size-normal-mini);
  }

  

  .wrapper {

    min-width: 100%;

  }

  .main-menu-container {
    min-width: auto;
    justify-content: space-between;
  }


 
}

@media (max-height: 450px) {
  .mobile-menu-content nav {
    flex-direction: row;
  }
}


</style>