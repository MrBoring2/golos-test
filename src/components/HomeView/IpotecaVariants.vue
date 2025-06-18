<script>

import it_ipoteca from '@/assets/images/ipoteca-variants/it-ipoteca.png'
import rassrochka from '@/assets/images/ipoteca-variants/rassrochka.png'
import semeinaya_ipoteca6 from '@/assets/images/ipoteca-variants/semeinaya-ipoteca6.png'
import semeinaya_ipoteca35 from '@/assets/images/ipoteca-variants/semeinaya-ipoteca35.png'
import transhevaya_ipoteca from '@/assets/images/ipoteca-variants/transhevaya-ipoteca.png'
import udvoim_mat_capital from '@/assets/images/ipoteca-variants/udvoim-mat-capital.png'
import zenezobeton_investicii from '@/assets/images/ipoteca-variants/zenezobeton-investicii.png'


export default {
    data() {
        return {
            secletedIpotecaVariantIndex: 0,
            itIpotecaImg: it_ipoteca,
            rassrochkaImg: rassrochka,
            semeinayaIpoteca6Img: semeinaya_ipoteca6,
            semeinayaIpoteca35Img: semeinaya_ipoteca35,
            transhevayaIpotecaImg: transhevaya_ipoteca,
            udvoimMatCapitalImg: udvoim_mat_capital,
            zenezobetonInvesticiiImg: zenezobeton_investicii
        }
    },
    methods: {
        setActiveIpotecaVariant(index) {
            if(index >= 0 && index <= 6)
                this.secletedIpotecaVariantIndex = index;
            else this.secletedIpotecaVariantIndex = 0;
            this.$nextTick(() => {
            if (window.innerWidth <= 900) {
                const container = this.$refs.scroller;
                const button = container.querySelector(`button:nth-child(${index + 1})`);
                if (button) {
                    container.scrollTo({
                    left: button.offsetLeft - 15,
                    behavior: 'smooth'
          });
        }
      }
    });
    const mainContainer = document.querySelector('.ipoteca-variants-container');
      if (mainContainer) {
        mainContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'start' 
        });
      }
  }
    }
}
</script>

<template>
    <div class="ipoteca-variants-container">
        <div class="ipoteca-variants-title">
            <p>Способы покупки</p>
        </div>
        <div class="ipoteca-variants-container-inner">
            <div class="slicky-constrols-container" >
            <aside class="ipoteca-variatns-controls-container" ref="scroller">
                <button class="ipoteca-variatns-controls-button" @click="setActiveIpotecaVariant(0)" :class="{ 'active': secletedIpotecaVariantIndex === 0}">
                    <div class="ipoteca-variatns-controls-icon-container">
                        <Transition name="icon">
                            <font-awesome-icon v-if="secletedIpotecaVariantIndex === 0" class="ipoteca-variatns-controls-icon" icon="fa-solid fa-check" size="xl"/> 
                            <font-awesome-icon v-else class="ipoteca-variatns-controls-icon" icon="fa-solid fa-percent" size="xl"/> 
                        </Transition>
                    </div>
                    <p class="ipoteca-variatns-controls-text">Семейная ипотека от 3,5%</p>
                </button>
                <button class="ipoteca-variatns-controls-button" @click="setActiveIpotecaVariant(1)" :class="{ 'active': secletedIpotecaVariantIndex === 1}">
                    <div class="ipoteca-variatns-controls-icon-container">
                         <Transition name="icon">
                            <font-awesome-icon v-if="secletedIpotecaVariantIndex === 1" class="ipoteca-variatns-controls-icon" icon="fa-solid fa-check" size="xl"/> 
                            <font-awesome-icon v-else class="ipoteca-variatns-controls-icon" icon="fa-solid fa-percent" size="xl"/> 
                        </Transition>
                    </div>
                        <p class="ipoteca-variatns-controls-text">Семейная ипотека от 6%</p>
              
                </button>
                <button class="ipoteca-variatns-controls-button" @click="setActiveIpotecaVariant(2)" :class="{ 'active': secletedIpotecaVariantIndex === 2}">
                    <div class="ipoteca-variatns-controls-icon-container">
                         <Transition name="icon">
                            <font-awesome-icon v-if="secletedIpotecaVariantIndex === 2" class="ipoteca-variatns-controls-icon" icon="fa-solid fa-check" size="xl"/> 
                            <font-awesome-icon v-else class="ipoteca-variatns-controls-icon" icon="fa-solid fa-percent" size="xl"/> 
                        </Transition>
                    </div>
                    <p class="ipoteca-variatns-controls-text">Удвоим материнский капитал</p>
                </button>
                <button class="ipoteca-variatns-controls-button" @click="setActiveIpotecaVariant(3)" :class="{ 'active': secletedIpotecaVariantIndex === 3}">
                    <div class="ipoteca-variatns-controls-icon-container">
                         <Transition name="icon">
                            <font-awesome-icon v-if="secletedIpotecaVariantIndex === 3" class="ipoteca-variatns-controls-icon" icon="fa-solid fa-check" size="xl"/> 
                            <font-awesome-icon v-else class="ipoteca-variatns-controls-icon" icon="fa-solid fa-percent" size="xl"/> 
                        </Transition>
                    </div>
                    <p class="ipoteca-variatns-controls-text">Траншевая ипотека</p>
                </button>
                <button class="ipoteca-variatns-controls-button" @click="setActiveIpotecaVariant(4)" :class="{ 'active': secletedIpotecaVariantIndex === 4}">
                    <div class="ipoteca-variatns-controls-icon-container">
                         <Transition name="icon">
                            <font-awesome-icon v-if="secletedIpotecaVariantIndex === 4" class="ipoteca-variatns-controls-icon" icon="fa-solid fa-check" size="xl"/> 
                            <font-awesome-icon v-else class="ipoteca-variatns-controls-icon" icon="fa-solid fa-percent" size="xl"/> 
                        </Transition>
                    </div>
                    <p class="ipoteca-variatns-controls-text">Рассрочка с последующей ипотекой</p>
                </button>
                <button class="ipoteca-variatns-controls-button" @click="setActiveIpotecaVariant(5)" :class="{ 'active': secletedIpotecaVariantIndex === 5}">
                    <div class="ipoteca-variatns-controls-icon-container">
                         <Transition name="icon">
                            <font-awesome-icon v-if="secletedIpotecaVariantIndex === 5" class="ipoteca-variatns-controls-icon" icon="fa-solid fa-check" size="xl"/> 
                            <font-awesome-icon v-else class="ipoteca-variatns-controls-icon" icon="fa-solid fa-percent" size="xl"/> 
                        </Transition>
                    </div>
                    <p class="ipoteca-variatns-controls-text">IT-ипотека</p>
                </button>
                <button class="ipoteca-variatns-controls-button" @click="setActiveIpotecaVariant(6)" :class="{ 'active': secletedIpotecaVariantIndex === 6}">
                    <div class="ipoteca-variatns-controls-icon-container">
                         <Transition name="icon">
                            <font-awesome-icon v-if="secletedIpotecaVariantIndex === 6" class="ipoteca-variatns-controls-icon" icon="fa-solid fa-check" size="xl"/> 
                            <font-awesome-icon v-else class="ipoteca-variatns-controls-icon" icon="fa-solid fa-percent" size="xl"/> 
                        </Transition>
                    </div>
                    <p class="ipoteca-variatns-controls-text">Железобетонные инвестиции</p>
                </button>
            </aside>
            </div>
            <Transition mode="out-in" >
                <div class="ipoteca-vartiants-content" :key="secletedIpotecaVariantIndex">
                    <div class="ipoteca-varitants-item"  v-if="secletedIpotecaVariantIndex === 0">
                        <div class="ipoteca-variants-item-text-content">
                            <div class="ipoteca-variants-item-title">
                                <p>Семейная ипотека от 3,5%</p>
                            </div>  
                            <div class="ipoteca-varitants-item-text">
                                <p>ООО Специализированный застройщик «Голос.Кашириных». Проектная декларация на сайте <a href="https://наш.дом.рф/" target="_blank" class="ipoteca-varitants-item-text-href">наш.дом.рф</a>. 
                                Ипотеку предоставляет АО «Альфа-Банк», ген.лицензия ЦБ РФ №1326 от 16.01.2015. Полная стоимость 
                                кредита составляет 3,513% - 5,162% ставка 3,5% на 30 лет, соответствующему Решению Минфина №24-67381-01460-Р от 28.06.2024, 
                                при одновременном соблюдении следующих условий:</p>
                                <p>1) Первоначальный взнос – от 20,1 % от стоимости недвижимости</p>
                                <p>2) В семье есть ребёнок младше 7 лет, либо</p>
                                <p>3) В семье есть ребёнок с особыми потребностями до 18 лет, либо</p>
                                <p>4) В семье два или более ребёнка младше 18 лет, при этом вы живёте в городе с 
                                населением менее 50 тысяч человек или в регионе из списка (в соответствии с постановлением)</p>
                                <p>5) наличии личного страхования заемщика. Подробнее на <a href="http://alfabank.ru" target="_blank" class="ipoteca-varitants-item-text-href">alfabank.ru</a>.</p>
                            </div>               
                        </div>
                        <div class="ipoteca-variants-item-image-content">
                            <img :src="semeinayaIpoteca35Img"/>
                        </div>
                    </div>
                    <div class="ipoteca-varitants-item" v-else-if="secletedIpotecaVariantIndex === 1">
                        <div class="ipoteca-variants-item-text-content">
                            <div class="ipoteca-variants-item-title">
                                <p>Семейная ипотека от 6%</p>
                            </div>  
                            <div class="ipoteca-varitants-item-text">
                                <p>ООО Специализированный застройщик «Голос.Кашириных». Проектная декларация на сайте 
                                    <a href="https://наш.дом.рф/" target="_blank" class="ipoteca-varitants-item-text-href">наш.дом.рф</a>.
                                Семейная ипотека действует до 31.12.2030. Кредит предоставляет ПАО «ЧЕЛИНДБАНК». 
                                Генеральная лицензия Банка России № 485. Полная стоимость кредита (займа) 7,051% - 7,220%, 
                                ставка на весь период – 6%, первоначальный взнос от 20,01%, срок – до 30 лет, сумма – до 6 млн. 
                                руб. Оценивайте свои финансовые возможности и риски.</p>
                            </div>               
                        </div>
                        <div class="ipoteca-variants-item-image-content">
                            <img :src="semeinayaIpoteca6Img"/>
                        </div>
                    </div>
                    <div class="ipoteca-varitants-item" v-else-if="secletedIpotecaVariantIndex === 2">
                        <div class="ipoteca-variants-item-text-content">
                            <div class="ipoteca-variants-item-title">
                                <p>Удвоим материнский капитал</p>
                            </div>  
                            <div class="ipoteca-varitants-item-text">
                                <p>Не оферта. ООО Специализированный застройщик «Голос.Кашириных» ИНН 7447099930, ОГРН 1067447048140. Проектные декларации на сайте
                                    <a href="https://наш.дом.рф/" target="_blank" class="ipoteca-varitants-item-text-href">наш.дом.рф</a>. Акция предоставляется ООО СЗ «Голос.Кашириных». Удваивается сумма имеющегося материнского семейного капитала, 
                                    актуальная сумма в справке СФР. Удваивание материнского семейного капитала осуществляется за счёт скидки, направленной на 
                                    приобретение квартиры в ЖК «Голос Кашириных». Подробнее о материнском капитале на сайте <a href="http://sfr.gov.ru" target="_blank" class="ipoteca-varitants-item-text-href">sfr.gov.ru</a>. Количество объектов ограничено. 
                                    Акция действует до 30.06.2025 г. Подробности акции по телефону +7 (351) 778-87-00 Оценивайте свои финансовые возможности и риски
                                </p>
                            </div>               
                        </div>
                        <div class="ipoteca-variants-item-image-content">
                            <img :src="udvoimMatCapitalImg"/>
                        </div>
                    </div>
                    <div class="ipoteca-varitants-item" v-else-if="secletedIpotecaVariantIndex === 3">
                        <div class="ipoteca-variants-item-text-content">
                            <div class="ipoteca-variants-item-title">
                                <p>Траншевая ипотека</p>
                            </div>  
                            <div class="ipoteca-varitants-item-text">
                                <p>НООО Специализированный застройщик «Голос.Кашириных». Проектная декларация на сайте <a href="https://наш.дом.рф/" target="_blank" class="ipoteca-varitants-item-text-href">наш.дом.рф</a>.
                                    Полная стоимость кредита рассчитывается от 26,533–31,888%. Предложение доступно по ставке от 26,2% годовых в рамках программ ПАО Сбербанк 
                                    «Приобретение строящегося жилья» и «Акция для застройщиков» при приобретении строящегося жилья у юридического лица по ДДУ/ДУПТ или 
                                    готового жилья у застройщика – партнера Банка: ООО СЗ "Голос Кашириных", при первоначальном взносе от 20,1% от стоимости кредитуемого 
                                    жилого помещения.Изучите все условия кредита (займа), включая информацию о возможных дополнительных расходах:
                                    <br/><a href="https://www.sberbank.ru/ru/person/credits/home/buying_project" target="_blank" class="ipoteca-varitants-item-text-href">https://www.sberbank.ru/ru/person/credits/home/buying_project</a>.
                                    Предложение действительно в период с 13.05.2025 по 30.06.2025 г. вкл. Ипотечное кредитование осуществляется ПАО Сбербанк, генеральная лицензия Банка 
                                    России на осуществление банковских операций № 1481 от 11.08.2015 г. Подробнее об условиях кредитования в ПАО Сбербанк, необходимых документах, ограничениях 
                                    уточняйте на сайте <a href="http://www.sberbank.ru" target="_blank" class="ipoteca-varitants-item-text-href">www.sberbank.ru</a>. Банк вправе отказать в предоставлении кредита без объяснения причин. 
                                    ОЦЕНИВАЙТЕ СВОИ ФИНАНСОВЫЕ ВОЗМОЖНОСТИ И РИСКИ
                                </p>
                            </div>               
                        </div>
                        <div class="ipoteca-variants-item-image-content">
                            <img :src="transhevayaIpotecaImg"/>
                        </div>
                    </div>
                    <div class="ipoteca-varitants-item" v-else-if="secletedIpotecaVariantIndex === 4">
                        <div class="ipoteca-variants-item-text-content">
                            <div class="ipoteca-variants-item-title">
                                <p>Рассрочка с последующей ипотекой</p>
                            </div>  
                            <div class="ipoteca-varitants-item-text">
                                <p>Рассрочка предоставляется ООО Голос.Кашириных, действует на квартиры, площадью более 60 кв.м. Первоначальный взнос 5% от стоимости 
                                    приобретаемого объекта (в рамках данной программы клиент может обратиться в компанию Голос.Плюс для последующей реализации недвижимости) 
                                    ежемесячные платежи по 30 000 (тридцать тысяч рублей) на 6 месяцев, далее оформление ипотечного кредита, либо внесение полной оплаты 
                                    стоимости квартиры. Первоначальный взнос 20% от стоимости приобретаемого объекта, ежемесячные платежи 30 000 (тридцать тысяч рублей рублей) 
                                    на 12 месяцев, далее оформление ипотечного кредита, либо внесение полной оплаты стоимости объекта.Первоначальный взнос 30% от стоимости 
                                    приобретаемого объекта, ежемесячные платежи 30 000 (тридцать тысяч рублей рублей) на срок до 15.08.2026, далее оформление ипотечного кредита, 
                                    либо внесение полной оплаты стоимости объекта. ООО СЗ «Голос.Кашириных». С проектной декларацией можно ознакомиться на сайте
                                    <a href="https://наш.дом.рф/" target="_blank" class="ipoteca-varitants-item-text-href">наш.дом.рф</a>.
                                </p>
                            </div>               
                        </div>
                        <div class="ipoteca-variants-item-image-content">
                            <img :src="rassrochkaImg"/>
                        </div>
                    </div>
                    <div class="ipoteca-varitants-item" v-else-if="secletedIpotecaVariantIndex === 5">
                        <div class="ipoteca-variants-item-text-content">
                            <div class="ipoteca-variants-item-title">
                                <p>IT-ипотека</p>
                            </div>  
                            <div class="ipoteca-varitants-item-text">
                                <p>Полная стоимость кредита рассчитывается от 6,3–9,947%Ставка от 6% годовых доступна в рамках программы ПАО Сбербанк «Ипотека для IT» на 
                                    срок кредитования от 12 до 360 месяцев при приобретении строящегося жилья у юридического лица по ДДУ/ДУПТ или готового жилья у застройщика – 
                                    партнера Банка: ООО СЗ "Голос.Кашириных".Изучите все условия кредита (займа), включая информацию о возможных дополнительных расходах.
                                    <a href="https://domclick.ru/ipoteka/programs/it-workers" target="_blank" class="ipoteca-varitants-item-text-href">https://domclick.ru/ipoteka/programs/it-workers</a> 
                                    Ипотечное кредитование осуществляется ПАО Сбербанк, генеральная лицензия Банка России на осуществление банковских операций № 1481 
                                    от 11.08.2015 г. Подробнее об условиях кредитования в ПАО Сбербанк, необходимых документах, ограничениях уточняйте на сайте 
                                    <a href="http://www.sberbank.ru" target="_blank" class="ipoteca-varitants-item-text-href">www.sberbank.ru</a>. 
                                    Банк вправе отказать в предоставлении кредита без объяснения причин.ОЦЕНИВАЙТЕ СВОИ ФИНАНСОВЫЕ ВОЗМОЖНОСТИ И РИСКИ
                                </p>
                            </div>               
                        </div>
                          <div class="ipoteca-variants-item-image-content">
                            <img :src="itIpotecaImg"/>
                        </div>
                    </div>
                    <div class="ipoteca-varitants-item" v-else-if="secletedIpotecaVariantIndex === 6">
                        <div class="ipoteca-variants-item-text-content">
                            <div class="ipoteca-variants-item-title">
                                <p>Железобетонные инвестиции</p>
                            </div>  
                            <div class="ipoteca-varitants-item-text">
                                <p>Скидка по Программе Железобетонные инвестиции предоставляется ООО СЗ «Голос.Кашириных» при соблюдении условий программы, подробно изложенных в 
                                    Положении на сайте <a class="ipoteca-varitants-item-text-href" href="http://golos.click" target="_blank">golos.click</a>. Первоначальный взнос 20% от стоимости приобретаемого 
                                    объекта. Приобрести объект недвижимости возможно при 100% оплате или оплате в рассрочку, действует только для рассрочки с равными платежами. 
                                    Начисление процентов, с целью последующего предоставления скидки, возможно только на сумму первоначального взноса. Проценты Размер скидки 
                                    начисляется рассчитывается с даты внесения денежных средств и до последнего дня месяца, предшествующего началу передачи объекта по формуле, 
                                    указанной в Положении. Данная программа не суммируется с другими акциями и предложениями. Не является офертой. Проектная декларация на сайте 
                                    <a href="https://наш.дом.рф/" target="_blank" class="ipoteca-varitants-item-text-href"></a>
                                </p>
                            </div>               
                        </div>
                        <div>
                            <aside class="ipoteca-variants-item-image-content">
                                <img :src="zenezobetonInvesticiiImg"/>
                            </aside>
                        </div>            
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.ipoteca-variants-container {
    display: flex;
    width: 60%;
    padding: 0 12px;
    gap: 3rem;
    min-width: calc(var(--ui-col) * 33);
    flex-direction: column ;
}


.ipoteca-variants-title {
    font-size: var(--font-size-large2);
    font-weight: 500;
}

.ipoteca-variants-container-inner {
    position: relative;
    display: flex;
    justify-content: space-between;
   
}

.ipoteca-variatns-controls-container {
    top: calc(var(--header-heigth) + 20px);
    padding: 4rem 0;
    -webkit-overflow-scrolling: touch; 
    scrollbar-width: none;
    
    position: sticky;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 20px;
}

.ipoteca-vartiants-content { 
    width: 80%;
    display: flex;
    justify-content: start;
    flex-direction: column;
}

.ipoteca-varitants-item {
    display: flex;
    justify-content: space-between;
 
    background-color: var(--vt-c-white-blue2);
    border-radius: 2rem;
    
    position: relative; /* Добавьте это */

}

.ipoteca-variants-item-text-content {
    display: flex;
    padding-left: 40px;
    padding: 4rem 0rem 4rem 4rem;
    flex-direction: column;
    width: 23rem;
    line-height: 1.5;
    gap: 2rem;
    
}

.ipoteca-varitants-item-text {
    font-size: var(--font-size-normal-mini);
    color: var( --vt-c-middle-gray);
    width: 100%;
}

.ipoteca-varitants-item-text-href{
    color: var(--vt-c-blue);
    transition: 0.2s;
    word-break: break-all;
    text-decoration: none;
}

.ipoteca-varitants-item-text-href:hover {
    color: var(--vt-c-light-blue);
    transform: all 0.5 easy;
    text-decoration: underline;
}

.ipoteca-variatns-controls-button {
    background: transparent;
    width: 10rem;
    border-width: 0;
    display: flex;
    text-align: left;
    padding: 0;
    gap: 1rem;
    align-items: center;
    transition: 0.2s;

}

.ipoteca-variatns-controls-button:hover > p,  .ipoteca-variatns-controls-button.active > p {
    color: var(--vt-c-blue);
    transform: all 0.5 easy;
}

.ipoteca-variatns-controls-button:hover > .ipoteca-variatns-controls-icon-container,
.ipoteca-variatns-controls-button.active > .ipoteca-variatns-controls-icon-container
{
    color: var(--vt-c-white);
    background: var(--vt-c-blue);
    transform: all 0.5 easy;
}

.ipoteca-variatns-controls-button p {
    font-size: var(--font-size-mini);
    color: var(--vt-c-middle-gray);
}

.ipoteca-variatns-controls-icon {

    font-size: var(--font-size-normal2);
    text-align: center;
}

.ipoteca-variatns-controls-icon-container {
    background-color: var(--vt-c-white-blue2);
    color: var(--vt-c-blue);
  
    border-radius: 3rem;
    min-width: 2.5rem;
    height: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
      transition: 0.2s;
}

.ipoteca-variants-item-image-content {
    position: sticky;
    align-self: flex-start;
    width: 35rem;
    height: 35rem;
    top: calc(var(--header-heigth) + 20px);
}

.ipoteca-variants-item-image-content img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 2rem;
}

.ipoteca-variants-item-title {
    font-size: var(--font-size-large);
    font-weight: 500;
    line-height: 1.2;
}

.v-enter-active{
    transition: all 0.2s ease-out;
    transition-delay: 0.1s; 
}

.v-leave-active {
    transition: all 0.3s ease-in;
}

.v-enter-from {
    transform: translateY(5px);
    opacity: 0;
}

.v-leave-to {
     transform: translateY(5px);
    opacity: 0;
}


.icon-leave-active,
.icon-enter-active {
  transition: all 0.4s cubic-bezier(0.5, 0, 0.5, 1);
  position: absolute;
}

.icon-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.icon-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.icon-enter-to {
  transform: translateY(0);
  opacity: 1;
}

@media (max-width: 900px) {
    .ipoteca-variants-container {
        min-width: 100%;
         padding-right: 0;
         gap: 10px;
    }

    .ipoteca-variants-title {
        font-size: var(--font-size-normal3);
    }
.ipoteca-variatns-controls-container {
    scroll-padding-left: 15px; /* Защитный отступ */
    scroll-behavior: smooth; /* Плавный скролл для ручного перетаскивания */
  }
    .ipoteca-variants-container-inner{
        flex-direction: column;
        padding-right: 10px;
        gap: 10px;
    }

    .ipoteca-variatns-controls-container {
        position: initial;
        flex-direction: row;
        overflow-x: auto;
        gap: 0;
        justify-content: space-between;
        gap: 30px;
        padding: 0;
        width: 100%;
      
    }

  .ipoteca-variatns-controls-container {
    display: flex;
    overflow-x: auto;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }


/* 2. Исправляем позиционирование анимации */
  .ipoteca-variatns-controls-button {
    position: relative;
    scroll-snap-align: start;
  }

























    .ipoteca-variatns-controls-text {
        white-space: nowrap;
        font-size: var(--font-size-mini3) !important; 
    }

    .ipoteca-variatns-controls-button {
        gap: 5px;
       width: 100%;
        
    }

    .ipoteca-vartiants-content {
        width: 100%;
    }

    .ipoteca-varitants-item {
        flex-direction: column;
        flex-flow: column-reverse;
    }
    .ipoteca-variants-item-text-content {
        padding: 20px;
        width: 100%;
        gap: 20px;
    }
    .ipoteca-varitants-item-text {
        width: auto;
       
    }
    .ipoteca-variants-item-title {
        font-size: var(--font-size-normal2);
    }

    .ipoteca-variants-item-image-content {
        width: 100%;
        position: initial;
        max-height: 35vh;
    }
}

</style>