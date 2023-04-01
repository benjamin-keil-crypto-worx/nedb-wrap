"use strict";
const assert = require( "assert" );
const chai = require("chai");
let Schema = require("../index").createSchema("./test/resources")

let testModel ={
    field1:"TestField1",
    field2:"TestField2",
    field3:"TestField3",
}

let testModel2 ={
    field4:"TestField4",
    field5:"TestField5",
    field6:"TestField6",
}

describe( "Nedb Wrapper Test", async () => {

    it( "It should Do all CRUD work", async () => {
        let testDbEntry = await Schema.setModel(testModel).Model().add("Test-Collection-Name")
        console.log(testDbEntry);
        chai.assert.containsAllKeys(testDbEntry,["field1", "field2", "field3","_id"]);
        let count = await Schema.Model().count("Test-Collection-Name",{field1:"TestField1"})
        chai.assert.equal(count,1);
         count = await Schema.Model().countAll("Test-Collection-Name")
        chai.assert.equal(count,1);
        let model = await Schema.Model().getBy("Test-Collection-Name",{field1:"TestField1"});
        chai.assert.containsAllKeys(model,["field1", "field2", "field3","_id"]);
        model.field1 = "TestField1-Updated";
        await Schema.Model().update("Test-Collection-Name",model);
        count = await Schema.Model().count("Test-Collection-Name",{field1:"TestField1-Updated"});
        chai.assert.equal(count,1);
        testDbEntry = await Schema.setModel(testModel2).Model().add("Test-Collection-Name");
        chai.assert.containsAllKeys(testDbEntry,["field4", "field5", "field6","_id"]);
        count = await Schema.Model().countAll("Test-Collection-Name");
        chai.assert.equal(count,2);
        let index =  await Schema.Model().delete("Test-Collection-Name",testDbEntry);
        count = await Schema.Model().countAll("Test-Collection-Name");
        chai.assert.equal(count,1);
        await Schema.Model().deleteAll("Test-Collection-Name");
        count = await Schema.Model().countAll("Test-Collection-Name");
        chai.assert.equal(count,0);
    });

} );
