const express = require('express');
    fs = require('fs');
    cors = require('cors');
    path = require('path')

const app = express();
    corsOptions = {
        origin: 'http://localhost:5173',
        method: ['GET', 'POST']
    };
app.use(cors(corsOptions));
app.use(express.json());

let animeList = [];

app.use(function(req, _, next){
    const now = new Date();

    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const data = `${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${req.get("user-agent")}`;
    
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(err){
        if(err) return console.log(err);    
        console.log("Лог записан");
    });
    next();
});

app.use(express.static(path.join(__dirname, '../client')))

app.get('/api', cors(), (req, res) => {
    res.json(animeList);
});

app.post('/api', (req, res) => {
    console.log('POST /api - Received data:', req.body);
    console.log('Request headers:', req.headers);
    console.log('Current animeList before:', animeList);

    const {title, episodes, status} = req.body;
    const exists = animeList.some(anime => 
        anime.title === title
    );

    if (exists){
        return res.status(400).json({error: `${title} уже в списке`});
    }


    const newAnime = {        
        id: Date.now(),
        title,
        episodes: parseInt(episodes),
        progress: 0,
        status,
    };

    animeList.push(newAnime)
    console.log('Added new anime:', newAnime);
    console.log('Current animeList after:', animeList);
    res.status(201).json(newAnime)
});

app.listen(3001, function(){
    console.log('Серв слушает 3001 порт');
});