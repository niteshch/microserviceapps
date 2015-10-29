var express = require('express');
var router = express.Router();

/* GET students listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/studentlist', function(req, res, next) {
    var db = req.db;
    var collection = db.get('student');
    collection.find({},{},function(e,docs){
            res.json(docs);
    });
});

module.exports = router;
