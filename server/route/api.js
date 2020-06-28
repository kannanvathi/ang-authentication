const express = require('express');
const route = express.Router();
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
/*route.get('/', (req, res) => {
    res.send('res from api');
});*/
const url = "mongodb+srv://bharathi:1CYwmH2ikbeB5dvE@cluster0-jcmqt.mongodb.net/test?retryWrites=true&w=majority";
 

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
route.post('/login', function(req, res){
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
                return res.status(200).send(token);
            }
        })
    })
})





route.get('/events',  function(req,res){
    let events = [{
    "name" : "bharathi",
    "role" : "designer",
    "description" : "mean a number of individuals thought of as a group because of a common quality or qualities",
    "dob"  : "30-02-1989"
    },
    {
        "name" : "bharathi",
        "role" : "designer",
        "description" : "mean a number of individuals thought of as a group because of a common quality or qualities",
        "dob"  : "30-02-1989"
        },
        {
            "name" : "bharathi",
            "role" : "designer",
            "description" : "mean a number of individuals thought of as a group because of a common quality or qualities",
            "dob"  : "30-02-1989"
            }];
    res.json(events);
})

module.exports = route;