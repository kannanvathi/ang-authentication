const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const mongodb = require("mongodb").MongoClient;
const jwt = require('jsonwebtoken');
const cors  = require('cors');
const path = require('path');
const apiCallFromRequest = require('./request');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

app.use(bodyParser.json());
const api = require('./route/api');

const port = 3000;





app.get('/', (req, res)=>{
    res.send("hello from node server");
});
app.use('/api', api);
app.use('/api/login', api);


const url = "mongodb+srv://bharathi:1CYwmH2ikbeB5dvE@cluster0-jcmqt.mongodb.net/test?retryWrites=true&w=majority";

var db;

mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, database)=>{

   db = database.db("ang_authentication");
  //console.log(error); 
   console.log("DB connected new");

});


const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true }, {
    useMongoClient: true,
    poolSize: 2,
    promiseLibrary: global.Promise
  })
//var registerUser = {email: 'email1@gmail.com', password: 'ssss', token: ''};
/* app.post('/register', (req,res)=>{
    let registerUser = req.body;
    console.log(registerUser);
    var dubToken;
    client.connect(function(err, db) {
        if (err) throw err;
        var dbo = db.db("ang_authentication");
        dbo.collection("users").insertOne(registerUser,  function(err, res) {
              if (err){
             
                throw err;
              } ;
              let payload = {subject: registerUser._id};
              let token = jwt.sign(payload, 'secretKey');
              registerUser.token = token;
              dubToken = token;
              console.log(dubToken)
              db.close();
 });
      });
      console.log('inserted');
      res.status(200).send('success');
});*/

app.post('/register', function(req, res){

    console.log(req.body);

    req.body._id = new Date().getTime();
    let payload = {subject: req.body._id};
    let token = jwt.sign(payload, 'secretKey');
    req.body.token = token;

    db.collection("users").insert(req.body, (error, data)=>{

        if(error)
        {
            return res.status(401).send('user already registered');
        }
        else {
            res.json("User Registered Successfully");
            
        }
    });
    
});

app.post('/login', function(req, res){
    let registerUser = req.body;
    client.connect(function(err, db){
        if (err)
        throw err;
        var dbo  = db.db('ang_authentication');
        dbo.collection('users').findOne({email: registerUser.email}, (err, dbUser)=>{
            if (err)
            throw err;
            if(!dbUser){
                return res.status(401).send('user not valid');
            }
            else if(dbUser.password != registerUser.password){
                return res.status(401).send('password not valid');
            }
            else{
                var payload = {subject : dbUser._id};
                var token = jwt.sign(payload, 'secretKey');
                console.log(token);
                res.json({token: dbUser.token});
            }
        })
    })
});

function verifyToken(req, res, next){
   
    if(req.headers['authorization'].split(" ")[1] == 'null'){
        console.log(req.headers['authorization'].split(" ")[1]);
        return res.status(401).send('1.Unauthorized user');
    }
    let token = req.headers['authorization'].split(" ")[1];
   
    if(token == 'null'){
        return res.status(401).send('2.Unauthorize user');
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload){
        return res.status(401).send('2.Unauthorize user');
    }
    req.userId = payload.subject;
    next();
};

/*app.get('/events', verifyToken,  function(req,res){
    
    res.json(events);
})*/

app.get('/events', verifyToken, function(req, res){
    var events;
    apiCallFromRequest.callApi(function(response){
        console.log(response);
         events = response;
         res.json(events);
    });
})

app.listen(port, function(){
    console.log("server running on " + port);
});



