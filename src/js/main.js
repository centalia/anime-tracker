    import '@/css/style.css'

    const animeList = [
        {id:1, "title":"Blood+", "type":"TV", "season":"Fail 2005", "episodes":"50", "watched":"20" },
        {id:2, "title":"Call o the Night Season 2", "type":"TV", "season":"Summer 2025", "episodes":"12", "watched":"3" },
        // {id:3, "title":"Black Butler: Emerald Witch Arc", "Type":"TV", "Season":"Spring 2025", "Progress":"4/13", "Score":"9" },
        // {id:4, "title":"Apocalypse Bringer Mynoghra: World Conquest Starts with the Civilization of Ruin", "Type":"TV", "Season":"Summer 2025", "Progress":"2/12", "Score":"-" },
        // {id:5, "title":"Gachiakuta", "Type":"TV", "Season":"Summer 2025", "Progress":"2/24", "Score":"-" },
    ]
        

function renderGrid(){
    const trackerBody = document.querySelector("#tracker-body")
    trackerBody.innerHTML = '';

    const newTrackerBody = animeList.map(anime =>
    `
        <div class="tracker-grid text">
            <div class="tracker-grid__border tracker-grid__status-watching"></div>
            <div class="tracker-grid__border">${anime.id}</div>
            <div class="tracker-grid__border">${anime.title}</div>
            <div class="tracker-grid__border">${anime.type}</div>
            <div class="tracker-grid__border">${anime.season}</div>
            <div class="tracker-grid__border">${anime.episodes}</div>
            <div class="tracker-grid__border">${anime.watched}</div>
        </div>
    `
    ).join('');

    trackerBody.insertAdjacentHTML('beforeend',newTrackerBody)
}

function addAnime(title, type, season, episodes, watched){
    // const exists = animeList.some(anime => 
    //     anime.title === title &&
    //     anime.type === type &&
    //     anime.season === season &&
    //     anime.episodes === episodes &&
    //     anime.watched === watched 
    // );

    // if (exists){
    //     console.warm(`${title} уже в списке`)
    //     return;
    // }

    animeList.push({        
        id: animeList.length + 1,
        title,
        type,
        season,
        episodes,
        watched,
    });

    renderGrid();
}

window.addAnime = addAnime;
window.animeList = animeList;
window.renderGrid = renderGrid;