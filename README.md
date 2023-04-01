# nedb-wrap 


nedb-wrap is a very simple wrapper around nedb a local small lightweight no-sql dtabase similiar to mongodb

https://www.npmjs.com/package/nedb


## Installation 


````bash
npm install --save nedb-wrap
````

## Usage


Importing and Setting a Database location in your Project

```js
let dataBasePath = "Some/location/in/your/Project"
let Schema = require("nedb-wrap").createSchema(dataBasePath)
```

### Common arguments:

- dataBasePath
  The Location where nedb should create the DB file
- collectionName
  The Name of the Collection the model data should be stored in  
- query
  A object containing a specific Query to query the Collection ex: ``{field1:"TestField1"}`` a query to find objects where ``field1`` is ``TestField1``



### Adding a New Collection & Data to your DB

```js
let collectionName = "Test-Collection-Name";

let testModel ={
    field1:"TestField1",
    field2:"TestField2",
    field3:"TestField3",
}

let testDbEntry = await Schema.setModel(testModel).Model().add(collectionName)
console.log(testDbEntry);

```



### Retrieving Collection Data By Specific Key and Value

```js

let model = await Schema.Model().getBy("Test-Collection-Name",{field1:"TestField1"});

```
### Retrieving Collection Data Mongo DB Style queries and projections 
please see https://www.npmjs.com/package/nedb for more info on how and what queries are supported.


```js
let collectionName = "Test-Collection-Name";

let model ={
  field1:"TestField1",
  field2:"TestField2",
  field3:"TestField3",
}
let docs = await Schema.Model().find(collectionName, { field1: 'TestField1' }, { field1: 1, field2: 1, field3: 0, _id:0 });

// docs is [{field1:"TestField1",field2:"TestField2"}]
```
### Raw Cursor and Pagination

please see https://www.npmjs.com/package/nedb for more info on how to use cursors and Pagination.
This is Copy Pasta from Nedb README.md just slightly adjusted for the nedb-wrap usage

```js
// Let's say the database contains these 4 documents
// doc1 = { _id: 'id1', planet: 'Mars', system: 'solar', inhabited: false, satellites: ['Phobos', 'Deimos'] }
// doc2 = { _id: 'id2', planet: 'Earth', system: 'solar', inhabited: true, humans: { genders: 2, eyes: true } }
// doc3 = { _id: 'id3', planet: 'Jupiter', system: 'solar', inhabited: false }
// doc4 = { _id: 'id4', planet: 'Omicron Persei 8', system: 'futurama', inhabited: true, humans: { genders: 7 } }

let collectionName = "Test-Collection-Name"
// No query used means all results are returned (before the Cursor modifiers)
Schema.Model().cursor(collectionName).find().sort({ planet: 1 }).skip(1).limit(2).exec(function (err, docs) {
  // docs is [doc3, doc1]
});

// You can sort in reverse order like this
Schema.Model().cursor(collectionName).find().sort({ planet: -1 }).exec(function (err, docs) {
  // docs is [doc1, doc3, doc2]
});

// You can sort on one field, then another, and so on like this:
Schema.Model().cursor(collectionName).find().sort({ firstField: 1, secondField: -1 })
```

### Retrieving all Collections 

```js

let model = await Schema.Model().getAll("Test-Collection-Name");

```

### Updating a model in a Collection

```js
let testModelUpdated ={
    field1:"TestField1-Updated",
    field2:"TestField2",
    field3:"TestField3",
}
await Schema.Model().update("Test-Collection-Name",testModelUpdated);

```
### Counting Records in the Collection

```js
let count = await Schema.Model().count("Test-Collection-Name",{field1:"TestField1"}) // Count records with a specific key and Values
let count = await Schema.Model().countAll("Test-Collection-Name")                    // count all Records for given Collection
```

### Deleting Collection Models

```js
await Schema.Model().delete("Test-Collection-Name",testDbEntry); // Delete a Model in the Collection
await Schema.Model().deleteAll("Test-Collection-Name");        // Delete all Models in the Collection
```


Have a look the test examples to get a better understanding how to use this module!
