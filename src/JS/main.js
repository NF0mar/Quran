document.addEventListener('DOMContentLoaded', () => {

    let container = document.querySelector(".container");
    let loader = document.querySelector(".loader");

    let structure = (surahNumber, surahEnglish, surahArabic) => {

        container.innerHTML += `
        <div class="surah-info">
            <div class="surah-names">
                <a href="http://127.0.0.1:5500/src/pages/quran.html?id=${surahNumber}" class="surah-en">${surahEnglish}</a>
                <a href="http://127.0.0.1:5500/src/pages/quran.html?id=${surahNumber}" class="surah-ar">${surahArabic}</a>
            </div>
            <span class="ayah-number">${surahNumber}</span>
        </div>`;

    }

    const surahSearch = (e) => {
        let surahInfo = document.querySelectorAll('.surah-info');
        let index = e.target.value.toUpperCase();

        surahInfo.forEach((surah) => {
            let surahEn = surah.querySelector(".surah-en").innerText.toUpperCase();
            let surahAr = surah.querySelector(".surah-ar").innerText.toUpperCase();

            if(surahEn.indexOf(index) > -1 || surahAr.indexOf(index) > -1) {
                surah.style.display = 'flex';
            }
            else {
                surah.style.display = 'none';
            }

        })
    }

    const getSurrah = async() => {
        loader.style.display = 'block';
        let response = await fetch("http://api.alquran.cloud/v1/quran/quran-uthmani");
        let surah = await response.json();
        loader.style.display = 'none';
        surah.data.surahs.forEach((sura) => {
            structure(sura.number, sura.englishName, sura.name);
        })

    }


getSurrah();

document.addEventListener('input', surahSearch)
    
})