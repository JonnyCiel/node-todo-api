//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Unable to connect to mongodb server");
    }

    console.log("Connected to MongoDB server");


    db.collection("Todos").findOneAndUpdate(
        {_id: new ObjectID("5894fd8d44ca2eb9fddacd84")},
        {$set: {
            completed: true
        }}, {returnOriginal : false}).then((result) => {
        console.log(result);
    });

    //db.close();
});