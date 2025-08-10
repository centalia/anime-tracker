    import '@/css/style.css'

    const animeList = [
        {id:1, "title":"Blood+", "Type":"TV", "Season":"Fail 2005", "Progress":"20/50", "Score":"-" },
        {id:2, "title":"Call o the Night Season 2", "Type":"TV", "Season":"Summer 2025", "Progress":"2/12", "Score":"-" },
        {id:3, "title":"Black Butler: Emerald Witch Arc", "Type":"TV", "Season":"Spring 2025", "Progress":"4/13", "Score":"9" },
        {id:4, "title":"Apocalypse Bringer Mynoghra: World Conquest Starts with the Civilization of Ruin", "Type":"TV", "Season":"Summer 2025", "Progress":"2/12", "Score":"-" },
        {id:5, "title":"Gachiakuta", "Type":"TV", "Season":"Summer 2025", "Progress":"2/24", "Score":"-" },
    ]
        

    const rowsTrackers = animeList.map(anime =>{
        return `
        <div class="tracker-grid text">
            <div class="tracker-grid__border tracker-grid__status-watching"></div>
            <div class="tracker-grid__border">${anime.id}</div>
            <div class="tracker-grid__border">${anime.title}</div>
            <div class="tracker-grid__border">${anime.Type}</div>
            <div class="tracker-grid__border">${anime.Season}</div>
            <div class="tracker-grid__border">${anime.Progress}</div>
            <div class="tracker-grid__border">${anime.Score}</div>
        </div>
        `;
    }).join('');

document.querySelector("#tracker-header").insertAdjacentHTML('afterend',rowsTrackers)
