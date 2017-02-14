const _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require('./db/moongose');
var {Todo} = require("./models/Todo");
var {User} = require("./models/User");

var app = express();
const port = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get("/todos", (req, res) => {
   Todo.find().then((todos) =>{
        res.send({todos,
        code: 200});
   }, (e) =>{
    res.status(400).send(e);
   });
});

app.get("/todos/:id", (req, res) => {
    var id = req.params.id;

    Todo.findById(id).then((doc) =>{
        if (!doc){
            return res.status(404).send(res.body);
        }
        res.send({doc});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete("/todos/:id", (req, res) => {
   var id = req.params.id;

   Todo.findByIdAndRemove(id).then((doc) => {
        if (!doc){
            return res.status(404).send();
        }

        res.send("Eliminado con éxito", {doc});
   }).catch((e) =>{
       res.status(400).send();
   });
});

app.patch("/todos/:id", (req, res) => {
   var id = req.params.id;
   var body= _.pick(req.body, ['text', "completed"]);

   if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
   }else{
        body.completed = false;
        body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo){
            return res.status(404).send();
        }

        res.send({todo});
   }).catch((e) => {
      res.status(400).send();
   });
});

app.listen(port, () => {
   console.log("Iniciado en puerto dd", port);
});



