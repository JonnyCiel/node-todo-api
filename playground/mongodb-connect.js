const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Unable to connect to mongodb server");
    }

    console.log("Connected to MongoDB server");

    // db.collection('Todos').insertOne({
    //     nombre: "Jonny",
    //     id: 1110500203,
    //     altura: 170
    // }, (err, result) => {
    //     if (err){
    //         return console.log("Unable to insert TODO", err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection("Users").insertOne({
        name: "Jonny",
        age: 26,
        location: "Colombia"
    }, (err, result) =>{
       if (err){
           return console.log("Error insertando", err);
       }

       console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
});