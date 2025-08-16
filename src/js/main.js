// import '@/css/style.css'

const STATUS = {
    WATCHING: "watching",
    COMPLETED: "completed",
    ON_HOLD: "on_hold",
    DROPPED: "dropped",
    PLAN_TO_WATCH: "plan_to_watch"
};  

const STATUS_CSS_CLASSES = {
    [STATUS.WATCHING]: `tracker-grid__status-watch`,
    [STATUS.COMPLETED]: `tracker-grid__status-complete`,
    [STATUS.ON_HOLD]: `tracker-grid__status-hold`,
    [STATUS.DROPPED]: `tracker-grid__status-drop`,
    [STATUS.PLAN_TO_WATCH]: `tracker-grid__status-plan`
};
const animeList = [
    {id:1, title:"Blood+", episodes: 50, progress: 50, status: "completed"},
    {id:2, title:"Call o the Night Season 2", episodes: 12, progress: 2, status: "watching"},
    {id:3, title:"Black Butler: Emerald Witch Arc", episodes: 13, progress: 4, status: "watching"},
    {id:4, title:"Apocalypse Bringer Mynoghra: World Conquest Starts with the Civilization of Ruin", episodes: 12, progress: 2, status: "watching"},
    {id:5, title:"Gachiakuta", episodes: 24, progress: 2, status: "watching"},
];

let sortSetting = {
    field: null,
    direction: "asc"
}

let filter = null;
renderGrid()

function renderGrid(){
    const trackerBody = document.querySelector("#tracker-body");
    trackerBody.innerHTML = '';

    const filteredAnimeByStatus = filterByStatus(filter);
    const sortedAnime = applySort(filteredAnimeByStatus, sortSetting)
    const newTrackerBody = sortedAnime.map(anime =>
    `
        <div class="tracker-grid text">
            <div class="tracker-grid__border ${STATUS_CSS_CLASSES[anime.status]}"></div>
            <div class="tracker-grid__border">${anime.id}</div>
            <div class="tracker-grid__border">${anime.title}</div>
            <div class="tracker-grid__border">${anime.progress} / ${anime.episodes}</div>
        </div>
    `
    ).join('');

    

    trackerBody.insertAdjacentHTML('beforeend',newTrackerBody);
}

function addAnime(title, /*type, season,*/ episodes, status){
    const exists = animeList.some(anime => 
        anime.title === title
    );

    if (exists){
        console.log(`${title} уже в списке`)
        return;
    }


    animeList.push({        
        id: animeList.length + 1,
        title,
        // type,
        // season,
        episodes,
        progress: 0,
        status,
    });

    renderGrid();
}

function watchNextEpisode(id){
    updateProgress(id, 1)
}

function updateProgress(id, progress){
    const updateAnime = animeList.find(anime => anime.id === id);
    if(updateAnime){
        const oldProgress = updateAnime.progress
        const watchingEpisodes = progress;
        updateAnime.progress = Math.min(oldProgress + watchingEpisodes, updateAnime.episodes);
        renderGrid();
        if(updateAnime.progress >= updateAnime.episodes){
            updateStatus(id, "completed")
        }
    } else {
        console.log("Аниме не найдено");
    }
}

function removeAnime(id){
    const rmAnime = animeList.findIndex(anime => anime.id === id);
    if(rmAnime !== -1){
        animeList.splice(id - 1, 1)
        animeList.forEach((anime, id) => {
            anime.id = ++id
        })
        renderGrid();
    } else {
        console.log("Аниме не найдено");
    }
}

function updateStatus(id, newStatus){
    const updateAnime = animeList.find(anime => anime.id === id);
    if(updateAnime){
        animeList.find(anime => anime === id);
        updateAnime.status = newStatus;
        renderGrid();
    } else {
        console.log("Аниме не найдено");
    }
}

function filterByStatus(status){
    if (!status){
        return animeList
    } else {
        return animeList.filter(anime => anime.status === status);
    }
}

function setFilter(newFilter){
    filter = newFilter;
    renderGrid()
}

function getFilter(){
    return filter;
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
}
