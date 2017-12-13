const express = require('express');
var _ = require("lodash");
var passport = require("passport");

const app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var aaa = require('./routes/aaa');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var urlencodedParser = bodyParser.urlencoded({extended: false});
var url = 'mongodb://snail:snails@ds129386.mlab.com:29386/chat_db';
// var multer = require('multer'); 
// var upload = multer()
var mongoose = require('mongoose');
mongoose.connect(url, {useMongoClient:true}, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});

var connect = mongoose.connection;
var msgs = mongoose.Schema({
    grup:String,
    msgs:{
        msg: String,
        author: String,
        date: String,
    },
});
var users = mongoose.Schema({
     local:{}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/msgtobd', function(req,res){
    // console.log(req.body);
    var body = req.body;
    res.json({'lol-bella':body.lol})
});





io.on('connection', (client) => {
    var msg=mongoose.model('msgs', msgs);
    var userinfo = mongoose.model('users',users)
    console.log('client conekt')
    client.on('beginchat',(grup)=>{
        msg.findOne({grup:grup},function(err,res){
            var body=JSON.parse(JSON.stringify(res))
            if (err) throw err;
            console.log(body)
            client.emit('beginchat',(body));
        })
    })


    client.on('getlogin',(objuser)=>{
        userinfo.find({},function(err,res){
            if (err) throw err;
            res.map((item, index)=>{
                if(item.email==objuser.email){
                    client.emit('getlogin',(item))
                }
            })
        })
    });
    client.on('msgtochat',(objmsg)=>{
        msg.findOne({grup:objmsg.grup.toString()},function(err,res){
            if (err) throw err;
            var body=JSON.parse(JSON.stringify(res));
            body.msgs.push(objmsg.msgs)
            console.log(body)
            msg.update({ grup:body.grup.toString()}, body, function(err) {
                if (err) throw err;
                console.log(body.grup+' successfully saved.');
            });
        });
        client.emit('msgfromchat',objmsg);
        client.broadcast.emit('msgfromchat',objmsg)
    });
    client.on('disconnect', function(){
        console.log('client disconect')
    })
});

const port = 8001;
io.listen(port);
console.log('listening on port to socket', port);

app.use('/aaa', aaa);

app.listen(3001, () => console.log('listening on port to 3001!'))