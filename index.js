const express = require('express');
var _ = require("lodash");
var passport = require("passport");
const app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var aaa = require('./routes/aaa');
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var url = 'mongodb://snail:snails@ds129386.mlab.com:29386/chat_db';
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User = require('./models/user'); // get our mongoose model
var mongoose = require('mongoose');


const path = require('path');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 8001;
const PORT2 = process.env.PORT || 3001;
const INDEX = path.join(__dirname, '/chat/build/index.html');
const server = express()
.use((req, res) => res.sendFile(INDEX) )
.listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);



mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// var multer = require('multer'); 
// var upload = multer()
// mongoose.connect(url, {useMongoClient:true}, function (err) {
//     if (err) throw err;
//     console.log('Successfully connected');
// });

var connect = mongoose.connection;
var msgs = mongoose.Schema({
    grup: String,
    admin: String,
    msgs: [{
        img: String,
        msg: String,
        author: String,
        date: String,
    }],
});
var users = mongoose.Schema({
    name: {
		type: String,
		required: true,
	}, 
	password: {
		type: String,
		required: true,
	}, 
	email: {
		type: String,
		required: true,
	},
	grups: Array, 
	admin: Boolean,
	userImg: String,
	grups:[]
});
var userschange = mongoose.Schema({
    name: String,
    password: String

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// RENDER index(all app) file
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname, 'chat/build/index.html'))
// })
app.get('/', (req, res) => {
    console.log(__dirname + '/chat/build/index.html');
    res.send(sdafaadfa);
})

app.post('/msgtobd', function (req, res) {
    var body = req.body;
    res.json({ 'lol-bella': body.lol })
});


io.on('connection', (client) => {
    var msg = mongoose.model('msgs', msgs);
    console.log('client connect')
    client.on('msgtochat', (objmsg) => {
        msg.findOne({ grup: objmsg.grup.toString() }, function (err, res) {
            if (err) throw err;
            var body = JSON.parse(JSON.stringify(res));
            body.msgs.push(objmsg.msgs);
            msg.update({ grup: body.grup.toString() }, body, function (err) {
                if (err) throw err;
            });
        });
        client.emit('msgfromchat', objmsg);
        client.broadcast.emit('msgfromchat', objmsg)
    });
    client.on('disconnect', function () {
        console.log('client disconnect')
    })
});

// choose img randomly
imgRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
let userImgs = ['icon1', 'icon2', 'icon3', 'icon4', 'icon5', 'icon6', 'icon7', 'icon8', 'icon9', 'icon10', 'icon11', 'icon12', 'icon13', 'icon14', 'icon15', 'icon16'];
// ========Signup New User
app.post('/setup', function (req, res) {
    let respons = { emailValRes : false, nameRes : false, emailRes : false, addedToDb : false, token : '', name : '', email : '', isOwner : true };

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        
    }
    function validate() {
        var email = req.body.email;
        if (!validateEmail(email)) {
            return false;
        } else {
            return true;
        }
    };

    if (validate()) {
        console.log('Set email to valid');
        respons.emailValRes = true;
    }

    User.find({ name: req.body.name }, (err, name) => {
        if (err) console.log(err);
        if (!name.length) {
            respons.nameRes = true;
        };

        User.find({ email: req.body.email }, (err, email) => {
            if (err) console.log(err);
            if (!email.length) {
                console.log('Login access');
                respons.emailRes = true; 
                respons.addedToDb = true;
                console.log(respons)
            }
            if (respons.emailValRes && respons.nameRes && respons.emailRes) {
                console.log('All parameters are Valid')
                // respons.name = req.body.name;
                // respons.email = req.body.email;

                let randomNum = imgRandom(0, 16);
                // create a sample user
                var nick = new User({
                    name: req.body.name,
                    email: req.body.email,
                    // password: req.body.password,
                    admin: true,
                    userImg: userImgs[randomNum],
                    grups:["main"]
                });
        
                nick.password = nick.generateHash(req.body.password);
                nick.save(function (err) {
                    if (err) throw err;
                    console.log('User saved successfully');
                    res.json({ success: true, respons });
                });

                // res.send(JSON.stringify(respons));
            } else {
                res.json({ respons });
            }

        });

    });


    console.log(req.body)
    // console.log(respons)


    // if (req.body.password) {
    //     let randomNum = imgRandom(0, 16);
    //     // create a sample user
    //     var nick = new User({
    //         name: req.body.name,
    //         email: req.body.email,
    //         // password: req.body.password,
    //         admin: true,
    //         userImg: userImgs[randomNum]
    //     });

    //     nick.password = nick.generateHash(req.body.password);
    //     nick.save(function (err) {
    //         if (err) throw err;
    //         console.log('User saved successfully');
    //         res.json({ success: true });
    //     });
    // }



});


// ==================Tokens requests ====================
let checkToken = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    // decode token
    
    // console.log("TOOOOKEN")
    // console.log(token)
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

}
// ===== Change profile 
app.post('/changeProfile', checkToken, function (req, res) {
    let body = req.body;

    if (body.newpassword === "") {
        User.update({ _id: req.body.id }, { name: body.newname, userImg: body.newImg }, function (err) {
            if (err) throw err;
        });
    } else {
        if (body.newname !== "") {
            console.log("UPDATING")
            User.findById({ _id: req.body.id }, function (err, user) {
                if (err) return handleError(err);
    
                let nick1 = new User();
                let pass = nick1.generateHash(body.newpassword);
                user.set({ password: pass, name: body.newname });
                user.save(function (err, updatedUser) {
                    if (err) return handleError(err);
                    res.send(updatedUser);
                });
            });
        }
        
        // User.update({ _id: req.body.id }, obj, function (err) {
        //     if (err) throw err;
        // });
    }
});
// ===== Delete profile (Class: Profile)
app.post('/deleteProfile', checkToken, function (req, res) {
    var body = req.body;
    var usersc = mongoose.model('users', userschange);
    usersc.findByIdAndRemove({ _id: req.body.id }, function (err) {
        if (err) throw err;
    });
});
// ===== Delete msg (Class: Chat)
app.post('/deleteMsgs', checkToken, function (req, res) {
    let body = req.body;
    let msg = mongoose.model('msgs', msgs);
    msg.findOne({grup: req.body.group}, function (err, db_msgs) {
        if(err) throw err;
        var body2 = JSON.parse(JSON.stringify(db_msgs))
        body2.msgs.splice(body.index,1)
        msg.update({ grup: body.group.toString() }, body2, function (err) {
            if (err) throw err;
        });
    })
    res.json(req.body.token)
});

// ======addNewGrup
app.post('/addNewGrup', checkToken, function (req, res) {
    var msg = mongoose.model('msgs', msgs);
    // var use = mongoose.model('users', users);
    var grup = new msg({
        grup:req.body.grup.toString(),
        admin:req.body.admin.toString(),
        msgs:[{
            img: "bot",
            author: "Snails bot",
            msg: "Hello it's chat room",
            date: "20-12-2017"
        }]
    })
    grup.save((err) => {
        if (err) throw err;
    })
    req.body.users.map(item => {
        User.findOne({name: item.name.toString()}, function (err, dt) {
            if(err) throw err;
            var b=JSON.parse(JSON.stringify(dt))
            b.grups.push(req.body.grup)
            console.log(b)
            User.update({name: item.name}, b, function (err) {
                if (err) throw err;
            });
        })
    })
    res.json("")
});

// ======Beginchat
app.post('/beginchat', checkToken, function (req, res) {
    var msg = mongoose.model('msgs', msgs);
    msg.findOne({grup: req.body.grup}, (err, ressend) => {
        if (err) throw err;
        res.json(ressend)
    })
});

// ======SearchUser
app.post('/searchuser', checkToken, function (req, res) {
    // var us = mongoose.model('users', users);
    User.findOne({name: req.body.user}, (err, ressend) => {
        if (err) throw err;
        // console.log(ressend)
        res.json(ressend)
    })
});


// ======GetLogin
app.post('/getllogin', checkToken, function (req, res) {
    // var usersc = mongoose.model('users', userschange);
    User.findOne({_id: req.decoded.id}, (err, ressend) => {
        if (err) throw err;
        res.json(ressend)
    })
});

// ======GetAllPeopleOnChat
app.post('/getpeopleonchat', checkToken, function (req, res) {
    // var usersc = mongoose.model('users', userschange);
    User.find({grup: res.body}, (err, ressend) => {
        if (err) throw err;

        var ressendb = JSON.parse(JSON.stringify(ressend));
        console.log(ressendb)
        res.json(ressendb)

    })
});
// ======Get Img to Msg
app.post('/getimgtomsg', checkToken, function (req, res) {
    var usersc = mongoose.model('users', userschange);
    usersc.findOne({name: req.body.name}, (err, ressend) => {
        if (err) throw err;
        res.json(ressend)
    })
});

// ======Test
app.post('/test', checkToken, function (req, res) {
    User.findOne({ _id: req.decoded.id }, function (err, db_users) {
        if (err) throw err;
        if (db_users) {
            let body = {
                name: db_users.name,
                img: db_users.userImg,
                groups: db_users.grups,
                id: req.decoded.id
            }
            res.json(body)
        } else res.json({ status: "NO USER" })

    })
});

// ===== Signup
app.post('/authenticate', function (req, res) {
    // console.log(req)
    // find the user
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, reason: 'user', message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if ( !user.validPassword(req.body.password)/*user.password != req.body.password*/) {
                // console.log(user) 
                res.json({ success: false, reason: 'password', message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var payload = {
                    id: user.id,
                    admin: user.admin,
                    // name: user.name,
                    // img: user.userImg
                }
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                });
            }

        }

    });
});

// const port = 8001;
// io.listen(port);
// console.log('listening on port to socket', port);

app.use('/aaa', aaa);

app.listen(PORT2, () => console.log('listening on port to 3001!'))

