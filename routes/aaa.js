var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
    // let num = req.body.info; 
    console.log(req.body)
    // console.log('num', num);
    // let data = {number: num}
    let data = req.body;
    res.send(data);
  })

module.exports = router;