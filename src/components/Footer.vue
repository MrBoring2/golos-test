<script>
import { RouterLink, RouterView } from 'vue-router'
import logo from './../assets/images/logo.png'
export default {
    data() {
        return {
            logo: logo
        }
    },
}
</script>

<template>
    <footer>
        <div class="footer-container">    
            <div class="footer-media">
                <div class="golos-info">
                    <div>
                        <img class="logo" :src="logo"  width="150px"></img> 
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
                        <RouterLink to="/">Информированное согласие пользователя сайта</RouterLink>
                        <RouterLink  to="/">Политика в отношении обработки персональных данных</RouterLink>
                        <RouterLink  to="/">Политика конфиденциальности</RouterLink>
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

.footer-media{
  width: 80%;
  padding-left: 10px;
  padding-right: 10px;
  color: var(--vt-c-white);
  width: calc(var(--ui-col) * 33);
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

.logo {
  left: 0;
}

.phone-number-footer {
  transition: 0.2s;
}

.phone-number-footer:hover {
  color: var(--vt-c-light-blue-lighter);
  transform: all 0.5 easy;
}

.golos-media{
  font-size: var(--font-size-icons-normal2);
  display: flex;
  gap: 20px;
  align-items: center;
}

.footer-icon {
  transition: 0.2s;
  color: var(--vt-c-white);
}

.footer-icon:hover {
  color: var(--vt-c-light-blue-lighter);
  transform: all 0.5 easy;
}

.footer-divider {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;
}

.footer-divider hr {
  border-color: var(--vt-c-light-blue);
}

.footer-components-production{
  width: calc(var(--ui-col) * 33);
  padding-left: 10px;
  padding-right: 10px;
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
  display: flex;
  gap: 20px;
  color: var(--vt-c-light-blue-lighter);
  font-size: var(--font-size-mini);
}

.confidence-content a {
  text-decoration: none;
  color: var(--vt-c-light-blue-lighter);
  transition: 0.2s;
}

.confidence-content a:hover {
  color: var(--vt-c-white);
  transform: all 0.5 easy;
}

.copyrite-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.copyrite{
  color: var(--vt-c-light-blue-lighter);
  font-size: var(--font-size-mini);
  width: 620px;
}

.developer {
  color: var(--vt-c-light-blue-lighter);
}
</style>