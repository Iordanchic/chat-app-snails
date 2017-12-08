const express = require('express')
const app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var aaa = require('./routes/aaa');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var urlencodedParser = bodyParser.urlencoded({extended: true});
var url = "mongodb://admin:admin@ds113906.mlab.com:13906/bd-db";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var jsonParser = bodyParser.json();

app.post('/msgtobd', urlencodedParser, function(req,res){
    var body = req.body
})

io.on('connection', (client) => {
    console.log('client conekt')
    client.on('msgtochat',(x)=>{
        client.emit('msgfromchat',x);
        client.broadcast.emit('msgfromchat',x)
    });
    client.on('disconnect', function(){
        console.log('client disconect')
    })
});

const port = 8000;
io.listen(port);
console.log('listening on port to socket', port);

app.use('/aaa', aaa);

app.listen(3001, () => console.log('listening on port to 3001!'))