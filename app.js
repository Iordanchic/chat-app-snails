const express = require('express')
const app = express();
var bodyParser = require('body-parser');

var aaa = require('./routes/aaa');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var jsonParser = bodyParser.json();

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/aaa', aaa);


app.listen(3001, () => console.log('Example app listening on port 3001!'))