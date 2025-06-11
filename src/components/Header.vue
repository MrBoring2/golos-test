<script>
import { RouterLink, RouterView } from 'vue-router'
import logo from './../assets/images/logo.png'
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
            ]
        }
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
            if(index == 0 || index == 3) {
                this.activeMenuIndex = index;
            }
        }
    }
}
</script>

<template>
    <div class="wrapper">
        <header>
            <div class="header">
                <div>
                    <img class="logo" :src="logo" width="150px"></img>
                </div>
                <nav class="main-menu">
                    <div class="ads">
                        <font-awesome-icon icon="percent" size="xs"/>
                        <p>Семейная ипотека 3.5%</p>
                    </div>
                    <RouterLink v-for="(item, index) in menuItems"  :key="index" 
                        @mouseenter="setActiveSubMenu(index)">{{item.name}}</RouterLink>
                </nav>  
                <div class="phone-number">
                    <a>+7 (351) 778-78-00</a>
                </div>
                <div class="icons">     
                    <font-awesome-icon class="icon" icon="phone" size="2xl"/>
                    <font-awesome-icon class="icon" icon="heart" size="2xl"/>  
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
</template>

<style scoped>


.wrapper {
  height: var(--header-heigth);
  top:0;
  z-index: 1000;
  min-width: calc(var(--ui-col) * 33);
  position: sticky;
  background-color: var(--vt-c-blue);

}
.wraper-sub-menu{
  position: absolute;
  width: 100%;
  min-width: calc(var(--ui-col) * 33);
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

.divider hr {
  border-color: var(--vt-c-light-blue);
}

.sub-menu {
  justify-content: center;
   transition: opacity 0.5s linear;
}


.header {
  padding-left: 10px;
  padding-right: 10px;
  min-width: calc(var(--ui-col) * 33);  
  display: flex;
  gap: 70px;
  align-items: center;
  justify-content: center;
  color: var(--vt-c-white);

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

.logo {
  left: 0;
}


.ads{
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
  font-size: var(--font-size-normal);
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


.sub-menu a.router-link-exact-active{
   color: var(--color-text);
  position: relative;
  text-decoration: none;
  transition: 0.2s; 
}

.sub-menu a.router-link-exact-active:after{
  display: block;
  content: "";
  height: 3px;
  width: 0;
  position: absolute;
  background-color: var(--vt-c-indigo);;
  transition: all 0.4s; 
}


.main-menu a.router-link-exact-active:after {
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

.icon {
    transition: 0.2s;
     color: var(--vt-c-white);
}

nav a.router-link-exact-active:hover, .phone-number:hover, .icon:hover {
  color:var(--vt-c-indigo);
  transform: all 0.5 easy;
}

</style>