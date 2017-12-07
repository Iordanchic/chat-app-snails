var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
    let num = req.body.number;
    console.log('num', num);
    let data = {number: 200}
    res.send(data);
  })

module.exports = router;