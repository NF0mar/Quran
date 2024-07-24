document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector('.container');
    let url = window.location.href;

    let id = url.split('?');

    let numberOfSurah = id[1].split('='); 
    
    let ayacounter = 0;

    let structure = async (aya, ayanumber) => {
        let ayaHtml = '';
        if(ayacounter < 1){
            let ayaSplit = aya.split('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ');

            ayaHtml += `
            <div class ="bisin"> 
                <a href"#" dir="rtl" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</a>
            </div>`;

            ayaHtml += `
            <div  class ="aayah">
                <a href="" dir='rtl' lang='ar'>
                    ${ayaSplit[1]}
                    <img src="../images/ayah.png" class="ayah-sign">
                    <span class ="ayah-number">${ayanumber}</span>
                </a>
            </div>`;
            tafsiir(numberOfSurah[1], ayanumber);
        }
        else {
            ayaHtml += `
            <div class = "aayah">
                <a href="" dir='rtl' lang='ar'>
                    ${aya}
                    <img src="../images/ayah.png" class="ayah-sign">
                    <span class ="ayah-number">${ayanumber}</span>
                </a>
            </div>`;
            tafsiir(numberOfSurah[1], ayanumber);
        }

        container.insertAdjacentHTML('beforeend', ayaHtml);
        const lastVerseElement = container.lastElementChild;
        tafsiir(numberOfSurah[1], ayanumber, lastVerseElement);

        ayacounter++;
        let numOfAya = document.querySelectorAll('.ayah-number');
        numOfAya.forEach(num => {
            if(parseInt(num.textContent) >= 10){
                num.style.left = "65px";
            }
        });
        
    }


    const reading = async (num) => {

        let response = await fetch(`https://api.alquran.cloud/v1/surah/${num}`);
        let surah = await response.json();

        surah.data.ayahs.forEach( (aya) => {
            structure(aya.text, aya.numberInSurah);
        })
    }

    const tafsiir = async (suraNum, ayaNum, verseElement) => {
        let response = await fetch(`/Quran/quraanJson/${suraNum}.json`);

        if (!response.ok) {
            console.error('Network response was not ok', response.statusText);
            return;
        }
    

        let sura = await response.json();

        let tafsiirHtml = `
        <div  dir='ltr' lang='en'>
            <a class ="aayah-tafsiir"  href="">
                ${sura.result[ayaNum-1].translation}
            </a>
        </div>
        <hr>
        `;

        verseElement.insertAdjacentHTML('afterend', tafsiirHtml);

        console.log(sura);
    }

    document.addEventListener('scroll', () => {
        const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
    
        if(scrollTop + clientHeight >= scrollHeight){
            
            setTimeout( () => {
                offset++;
                reading(numberOfSurah[1]);
    
            },1000);
    
        }
    })

reading(numberOfSurah[1])

})