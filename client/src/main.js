// import '@/css/style.css'
import { aniDB } from "./js/animeDB";
import { createApp } from "vue";
import App from './App.vue'


createApp(App).mount('#app');

/*
const btnOpenModal          = document.querySelector('.show-modal');
const modalWindow           = document.querySelector('.modal');
const btnCloseModal         = document.querySelector('.close-modal');
const overlayModal          = document.querySelector('.overlay');
const btnOpenToast          = document.querySelector('.toast-btn');
const toastNotification     = document.querySelector('.toast');


btnOpenModal.addEventListener("click", function(){
    overlayModal.classList.remove('hidden');
    modalWindow.classList.remove('hidden');
});

btnCloseModal.addEventListener("click", function(){
    overlayModal.classList.add('hidden');
    modalWindow.classList.add('hidden');
});

overlayModal.addEventListener("click", function(e){
    if(e.target === overlayModal){
        overlayModal.classList.add('hidden');
        modalWindow.classList.add('hidden');
    }
});

modalWindow.addEventListener('click', function(e){
    e.stopPropagation();
});

document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !modalWindow.classList.contains('hidden')){
            overlayModal.classList.add('hidden');
            modalWindow.classList.add('hidden');
    }
});

function showToast(message){
    toastNotification.textContent = message;
    toastNotification.classList.add('toast-show');

    setTimeout(() => {
        toastNotification.classList.remove('toast-show')
    }, 3000);
}
function clearForm(){
    document.querySelector('#anime-title').value = '';
    document.querySelector('#anime-episodes').value = '';
    overlayModal.classList.add('hidden');
    modalWindow.classList.add('hidden');
}

let sortSetting = {
    field: null,
    direction: "asc"
};

function addAnimeFromForm(){
    const title = document.querySelector('#anime-title').value;
    const episodes = parseInt(document.querySelector('#anime-episodes').value);
    const status = document.querySelector('#anime-status').value;
    let exists = animeList.some(anime => 
        anime.title === title
    );

    if(exists){
        showToast(`${title} уже в списке`)
    } else {
        addAnime(title, episodes, status);
        showToast(`${title} добавлен в список`);
    }

    clearForm();

}

function compareByProgress(a, b, direction){
    const diff = a.progress - b.progress
    return direction === "asc" ? diff : -diff
}

function compareByTitle(a, b, direction){
    const diff = a.title.localeCompare(b.title)
    return direction === "asc" ? diff : -diff
}

function applySort(array, setting){
    if (!setting || !setting.field){
        return [...array];
    }

    const sorted = [...array];

    switch(setting.field){
        case "progress":
            sorted.sort((a, b) =>
                compareByProgress(a, b, setting.direction))
            break;
        case "title":
            sorted.sort((a, b) =>
                compareByTitle(a, b, setting.direction))

    }

    return sorted;
}

function setSort(newSetting){
    sortSetting = {
        ...sortSetting,
        ...newSetting
    }
    renderGrid()
}

function getSort(){
    return sortSetting;
} */

