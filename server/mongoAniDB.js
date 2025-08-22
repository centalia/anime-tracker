const {MongoClient} = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017')

let aniDB = null;
let isConnected = false;

const connectDB = async () => {
    try{
        await client.connect();
        aniDB = client.db('animeTracker');
        isConnected = true;
        return aniDB;
        
    } catch(error){
        console.log('Failed connection to MongoDB');
        isConnected = false;
        throw error;
    }
}

function getDB(){
    if (!isConnected || !aniDB) throw new Error("MongoDb not connection");
    return aniDB;
}

function getStatusDB(){
    return isConnected && aniDB !== null
}

module.exports = { connectDB, getDB, isConnected: getStatusDB }
