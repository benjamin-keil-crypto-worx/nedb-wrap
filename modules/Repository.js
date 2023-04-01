let {NeDBHelper} = require('./nedb-wrap');

class Repository extends NeDBHelper {
    static init(dbPath) {
        return new Repository(dbPath);
    }

    constructor(dbPath) {
        super(dbPath);
        this.model = null;
    }
}

class Model {
    static setDb(dbPath = "./db") {
        return new Model(dbPath)
    }

    constructor(dbPath) {
        this.repository = new Repository(dbPath);
        this.Schema = {model: null};
    }

    setModel(model) {
        this.Schema.model = model;
        this.bindCrudHandler(model)
        return this;
    }

    Model() {
        return this.Schema;
    }

    hasCachedModel() {
        return this.Schema.model !== null && this.Schema.model !== undefined
    }

    isMethodCallWithArgs(args) {
        return args !== null && args !== undefined
    }

    bindCrudHandler() {
        let me = this;

        this.Schema.add = async (collectionName, model = null) => {
            if (me.hasCachedModel() && !me.isMethodCallWithArgs(model)) {
                return await me.repository.add(collectionName, this.Schema.model);
            } else {
                if (!me.isMethodCallWithArgs(model)) {
                    return false;
                }
                return await me.repository.add(collectionName, model);
            }
        };
        this.Schema.find = async (collectionName, query, projection={}) => {
            if (!me.isMethodCallWithArgs(query)) {
                return false;
            }
            return await me.repository.find(collectionName, query,projection)
        };
        this.Schema.cursor = async (collectionName, query, projection={}) => {
            if (!me.isMethodCallWithArgs(query)) {
                return false;
            }
            me.repository.cursor()
        };
        this.Schema.getBy = async (collectionName, query) => {
            if (!me.isMethodCallWithArgs(query)) {
                return false;
            }
            return await me.repository.getBy(collectionName, query)
        };
        this.Schema.getAll = async (collectionName) => {
            return await me.repository.getAll(collectionName)
        };
        this.Schema.count = async (collectionName, query) => {
            if (!me.isMethodCallWithArgs(query)) {
                return false;
            }
            return await me.repository.count(collectionName, query)
        };
        this.Schema.countAll = async (collectionName) => {
            return await me.repository.countAll(collectionName)
        };
        this.Schema.update = async (collectionName, model = null) => {

            if (!me.isMethodCallWithArgs(model)) {
                    return false;
                }
                return await me.repository.update(collectionName, { _id:model._id }, model)
        };
        this.Schema.delete = async (collectionName, model = null) => {
            if (!me.isMethodCallWithArgs(model)) {
                return false;
            }
            return await me.repository._delete(collectionName, model);
        };
        this.Schema.deleteAll = async (collectionName) => {
            return await me.repository._deleteAll(collectionName);
        };
    }

}

module.exports = {Model: Model};
