export class aniDB{
    constructor(dbName, dbVer){
        this.dbName = dbName;
        this.dbVer  = dbVer;
    }
    
    async init(){
        return new Promise((resolve, reject) => {
            const dbOpen = window.indexedDB.open(this.dbName, this.dbVer);

            // if(dbUpg){
            //     dbOpen.onupgradeneeded = (e) => {
            //         dbUpg(dbOpen.result, e.oldVer, e.newVer)
            //     };
            // };
            dbOpen.onsuccess = () => {
                this.db = dbOpen.result;
                resolve(this);
            };
            dbOpen.onerror = (e) => {
                reject(`IndexedDB err: ${e.target.errorCode}`);
            };

            dbOpen.onupgradeneeded = (e) =>{
                const db = e.target.result;
                if(!db.objectStoreNames.contains('anime')){
                    const store = db.createObjectStore('anime', {
                        keyPath: 'id'
                    });
                    store.createIndex('status', 'status', {
                        unique: false
                    });    
                }
            }
        });
    }    

    async set(storeName, value){
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(value);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    async get(storeName, id){
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly'),
                store = transaction.objectStore(storeName),

                req = store.get(id)

            req.onsuccess = () => {
                resovle(req.result);
            }
            
            req.onerror = () => {
                resovle(req.error);
            };
        });
    }
    
    async getAll(storeName){
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly'),
                store = transaction.objectStore(storeName),

                req = store.getAll()

            req.onsuccess = () => resolve(req.result);
            
            req.onerror = () => resolve(req.error);
        });
    }

    async addAnime(anime) {
        return this.set('anime', anime);
    }

    async getAllAnime(anime){
        return this.getAll('anime');
    }

}
    