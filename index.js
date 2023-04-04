let {Model} = require("./modules/Repository")

module.exports.createSchema = (dbPath) =>{return Model.setDb(dbPath)};
