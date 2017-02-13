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
        res.send(JSON.stringify(req.body));
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

app.listen(port, () => {
   console.log("Iniciado en puerto dd", port);
});



