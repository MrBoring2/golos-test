<script>

</script>

<template>
    <div class="advanteges-container">
        <aside class="text-container">
            <div class="text-container-inner">
                <p class="title">Всё необходимое рядом</p>
                <p class="description">Одним из преимуществ локации является отличная транспортная доступность, благодаря которой есть возможность добраться в любую часть города. Рядом с кварталом есть остановки общественного транспорта, магазины, рестораны, фитнес-центры, детские сады, школы, больницы.</p>
            </div>
        </aside>
        <div class="advantege-box-container">
            <div class="advantage-box">
                <div class="advantage-box-title-container">
                    <p class="advantage-box-title-top">1</p>
                    <p class="advantage-box-title-bottom">мин.</p>
                </div>
                <p class="advantage-box-title-description">до остановки «Отрадная».</p>
            </div>
            <div class="advantage-box">
                <div class="advantage-box-title-container">
                    <p class="advantage-box-title-top">15</p>
                    <p class="advantage-box-title-bottom">мин.</p>
                </div>
                <p class="advantage-box-title-description">на автомобиле до площади Революции.</p>
            </div>
            <div class="advantage-box">
                 <div class="advantage-box-title-container">
                    <p class="advantage-box-title-top">10</p>
                    <p class="advantage-box-title-bottom">мин.</p>
                </div>
                <p class="advantage-box-title-description">до ледовой арены «Трактор».</p>
            </div>
            <div class="advantage-box">
                <div class="advantage-box-title-container">
                    <p class="advantage-box-title-top">10</p>
                    <p class="advantage-box-title-bottom">мин.</p>
                </div>
                <p class="advantage-box-title-description">на автомобиле до ЦПКиО им. Ю.А. Гагарина.</p>
            </div>
            <div class="advantage-box">
                <div class="advantage-box-title-container">
                    <p class="advantage-box-title-top">1,5</p>
                    <p class="advantage-box-title-bottom">км.</p>
                </div>
                <p class="advantage-box-title-description">до ТРК «Родник».</p>
            </div>
            <div class="advantage-box">
                <div class="advantage-box-title-container">
                    <p class="advantage-box-title-top">100</p>
                    <p class="advantage-box-title-bottom">м.</p>
                </div>
                <p class="advantage-box-title-description">до ближайшей общеобразовательной школы.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .advanteges-container {
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        min-width: calc(var(--ui-col) * 33);
        width: 60%;
         margin-bottom: 20px;
        position: relative;
        justify-content: space-between;
        align-items: start;
    }
    .text-container {
        min-height: 100%;
        display: flex;
        top: calc(var( --header-heigth) + 20px);
        position: sticky;
        min-height: 2em;
        width: 25rem;
     
        flex-shrink: 0;
         justify-content: start;
    }

    .title {
        font-size: var(--font-size-large3);
        font-weight: 500;
        
    }

    .description {
        font-size: var(--font-size-normal2);
    }

    .text-container-inner{
        position: sticky;
        top:10px;
        height: 100%;
        gap: 40px;
        display: flex;
        justify-content: start;
        flex-direction: column;
    }

    .advantege-box-container {
        display: grid;
        max-width: 70%;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 15px;
    }

    .advantage-box {
       background-color: var(--vt-c-white-blue);
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       gap: 30px;
       padding: 30px;
       width:  15rem;
       height: 15rem;
       border-radius: 20px;
    }

    .advantage-box-title-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        line-height: 1;
        color: var(--vt-c-blue);
      
    }

    .advantage-box-title-top {
        font-size: var(--font-size-super-large);
        font-weight: 500;
    }

     .advantage-box-title-bottom {
        font-size: var(--font-size-normal4);
        font-weight: 500;
    }

    .advantage-box-title-description {
        color: var(--vt-c-gray);
        font-size: var(--font-size-normal-mini);
        text-align: center;
    }

      @media (max-width: 900px) {
         .advanteges-container {
            min-width: 100%;
            flex-direction: column;
            gap: 30px;
         }
         .text-container {
            position:initial;
            width: 100%;
          
          
         }

         .advantage-box-title-top {
        font-size: var(--font-size-large4);
                }
            .advantage-box-title-bottom {
                font-size: var(--font-size-mini);
            }

            .advantage-box-title-description {
                 font-size: var(--font-size-mini);
            }

         .text-container-inner {
              gap: 20px;
         }

         .advantage-box {
            width: 100%;
            height: auto;
            padding: 15px;
         }

         .advantege-box-container {
            position: relative;
            width: 100%;
            max-width: 100%;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
         }
       
         .title {
            font-size: var(--font-size-normal4);
         }
         .description {
            font-size: var(--font-size-normal-mini)
         }


      }
</style>