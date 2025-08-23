const express = require('express');
const { connectDB, getDB, isConnected } = require('./mongoAniDB');
const { ObjectId } = require('mongodb');
    fs = require('fs');
    cors = require('cors');
    path = require('path')

const app = express();
    corsOptions = {
        origin: 'http://localhost:5173',
        method: ['GET', 'POST', 'PATCH', 'DELETE']
    };
app.use(cors(corsOptions));
app.use(express.json());

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


app.use('/src', express.static(path.join(__dirname, '/src')))
app.use(express.static(path.join(__dirname, '../client')))

connectDB().then(() => {
    app.listen(3001, () => {
        console.log('aniTracker Server запущен успешно');
        console.log('MondoDB:', isConnected() ? 'Connect' : 'Disconnect');
        console.log('DB instance:', getDB ? 'Exists' : 'Undefined');
        
    });
}).catch(err => {
    console.log('aniTracker Server не запущен');
    
})

app.get('/api/anime', async (req, res) => {
    try{
        const db = getDB();
        if(!db){
            return res.status(500).json({ error: 'Database not available' });
        }
        const anime = await db.collection('anime').find().toArray();
        res.json(anime);
    } catch(error){
        res.status(500).json({
            error: 'DB error: ' + error.massage
        });
    }
});

app.post('/api/anime', async (req, res) => {
    
    try{
        let db = getDB();
        const {title, episodes, status} = req.body;
        const exists = await db.collection('anime').findOne({
            title,
        })

        if (exists){
        return res.status(400).json({
            error: `${title} уже в списке`
        });
        }

        const newAnime = {        
        title,
        episodes: parseInt(episodes),
        progress: 0,
        status,
    };
        const anititle = db.collection('anime').insertOne(newAnime);

        res.status(201).json({
            _id: anititle.insertedId,
            ...newAnime
        })
    } catch(error) {
        res.status(500).json({
            error: "Error add"
        });
    }    
});

app.patch('/api/anime/:id/progress', async (req, res) => {
    try {
        let db = getDB();
        const { id } = req.params;
        const { progress } = req.body;

        const updatedTitle = await db.collection('anime').updateOne({
            _id: new ObjectId(id) 
            },
            {
                $inc:{
                    progress: parseInt(progress),
                }
            }
        ); 

        res.json({
            modifiedCount: updatedTitle.modifiedCount
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Something went wrong'
        });
    }
});

app.patch('/api/anime/:id/progress/increment', async (req, res) => {
    try {
        let db = getDB();
        const { id } = req.params;

        const updatedTitle = await db.collection('anime').updateOne({
            _id: new ObjectId(id) 
            },
            {
                $inc:{
                    progress: 1,
                }
            }
        ); 

        res.json({
            modifiedCount: updatedTitle.modifiedCount
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Something went wrong'
        });
    }
});

app.patch('/api/anime/:id/status', async (req, res) => {
    try {
        let db = getDB();
        const { id } = req.params;
        const { status } = req.body;

        const updatedTitle = await db.collection('anime').updateOne({
            _id: new ObjectId(id) 
            },
            {
                $set:{
                    status: status,
                }
            }
        ); 

        res.json({
            modifiedCount: updatedTitle.modifiedCount
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Something went wrong'
        });
    }
});

app.delete('/api/anime/:id', async (req, res) => {
    try {
        let db = getDB();
        const { id } = req.params;

        const deleteTitle = await db.collection('anime').deleteOne({
            _id: new ObjectId(id)
        })

        res.json({
            deletedCount: deleteTitle.deletedCount
        })
    } catch(error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Something went wrong'
        });
    }
});