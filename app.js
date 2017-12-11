const express = require('express')
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
    date: String,
    msg: String,
    author: String
});
var users = mongoose.Schema({
     local:{
        //  email:String,
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/msgtobd', function(req,res){
    console.log(req.body);
    var body = req.body;
    res.json({'lol-bella':body.lol})
})

io.on('connection', (client) => {
    var msg=mongoose.model('msgs', msgs);
    var userinfo = mongoose.model('users',users)
    console.log('client conekt')
    client.on('getlogin',(objuser)=>{
        // var userinfo = new userinfo1(objuser);
        userinfo.find({},function(err,res){
            if (err) throw err;
            res.map((item, index)=>{
                if(item.local.email==objuser.email){
                    client.emit('getlogin',(item.local))
                }
            })
        })
    });
    // client.emit('getlogin',userinfo);

    // client.emit('beginchat',objoldmsg);
    client.on('msgtochat',(objmsg)=>{
        
        var newmsgs = new msg(objmsg)
        newmsgs.save(function(err) {
            if (err) throw err;
                console.log('Book successfully saved.');
            });
        client.emit('msgfromchat',newmsgs);
        client.broadcast.emit('msgfromchat',newmsgs)
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