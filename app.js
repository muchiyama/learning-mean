var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();
var users;



app.use(express.static('front'));
app.use(bodyParser.json());
app.listen(3000);

// mongodb.MongoClient.connect(
//     'mongodb+srv://my-dbo:p@ss1234@learning-cluster.zsu5i.mongodb.net/learning-cluster?retryWrites=true&w=majority', (err, database) => 
//     {
//          users = database.collection('users');
//     }
// );

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://my-dbo:p@ss1234@learning-cluster.zsu5i.mongodb.net/learning-cluster?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    users = client.db("learning-cluster").collection("users");
});

// 一覧取得
app.get("/api/users", (req, res) => { 
    users.find().toArray((err, items) => {
        res.send(items);
    });
});

// 個人取得
app.get("/api.users/:_id", (req, res) => {
    users.findOne({_id: mongodb.ObjectID(req.params._id)}, (err, item) => {
        res.send(item);
    });
});

app.post("/api/users", (req, res) => {
    var user = req.body;
    if(user._id) user._id = mongodb.ObjectID(user._id);
    users.save(user, () => {
        res.send("insert or update");
    });
});

app.delete("/api/usres/:_id", (req, res) => {
    users.remove({_id: mongodb.ObjectID(req.params._id)}, () => {
        res.send("delete");
    });
});

