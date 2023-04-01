let NeDB = require("./dbUtils");

class NeDBHelper {
    static getInstance(){ return new NeDBHelper() }

    constructor( dbPath ) {
        this.dbPath = dbPath;
        this.db = null;
        this.pool = null;
        this.createPool();

    }

    createPool(){
            this.pool = [];
    }

    connect(collection){
        let connectionFound = false;
        // see if we have already a connection in pool.
        this.pool.forEach((connection) => {
            if (Object.keys(connection)[0] === collection) {
                this.db = connection[collection];
                connectionFound = true;
            }
        });
        if(connectionFound){
            return false;
        } else{
            this.db = NeDB.connect(`${this.dbPath}/${collection}`);
            this.pool.push({[collection]:this.db});
            return false;
        }
    }

    load(collection_name){
        // load the collection (file)  will be created if doesn't exist
        this.connect(collection_name);
    }

    add(collection_name,entity) {
        return new Promise((resolve, reject) => {
            this.load(collection_name);
            this.db.insert(entity, function (err, newDoc) {
                if(err){
                    console.log(err)
                }
                else{
                    resolve(newDoc);
                }
            });
        });
    }

    getBy(collection_name,query){
        return new Promise((resolve, reject) => {
            this.load(collection_name);
            this.db.findOne(query, function (err, docs) {
                if(err){
                    console.log(err);
                }
                else{
                    resolve(docs);
                }
            });
        });
    };
    find(collection_name,query, projection={}){
        return new Promise((resolve, reject) => {
            this.load(collection_name);
            this.db.find(query, projection,function (err, docs) {
                if(err){
                    console.log(err);
                }
                else{
                    resolve(docs);
                }
            });
        });
    };

    getAll(collection_name){
        return new Promise((resolve, reject) => {
            this.load(collection_name);
            this.db.find({}, function (err, docs) {
                if(err){
                    console.log(err)
                }
                else{
                    resolve(docs);
                }
            });
        });
    };

    countAll(collection_name){
        return new Promise((resolve, reject) => {
            this.load(collection_name);
            this.db.count({}, function (err, count) {
                if(err){
                    console.log(err)
                }
                else{
                    resolve(count);
                }
            });
        });
    };
    cursor(collection_name){
        this.load(collection_name);
        return {find:() =>{this.db.find({})}};
    };
    count(collection_name,query){
        return new Promise((resolve, reject) => {
            this.load(collection_name);
            this.db.count(query, function (err, count) {
                if(err){
                    console.log(err)
                }
                else{
                    resolve(count);
                }
            });
        });
    };

    update(collection_name,index,entity){
        return new Promise((resolve, reject) => {
            this.load(collection_name);
            this.db.update(index, entity, {}, function (err, numReplaced) {
                if(err){
                    console.log(err)
                }
                else{
                    resolve(numReplaced);
                }
            });
        });
    };

    _delete(collection_name,entity){
        return new Promise((resolve, reject) => {
            this.load(collection_name);
            this.db.remove(entity, {}, function (err, numRemoved) {
                if(err){
                    console.log(err)
                }
                else{
                    resolve(numRemoved);
                }
            });
        });
    };

    _deleteAll(collection_name){
        return new Promise((resolve, reject) => {
            this.load(collection_name);
            this.db.remove({}, {multi:true}, function (err, numRemoved) {
                if(err){
                    console.log(err)
                }
                else{
                    resolve(numRemoved);
                }
            });
        });
    };
}

module.exports = {NeDBHelper:NeDBHelper}






