var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/getstudents', function(req, res) {
    res.render('studentlist');
});

router.get('/createstudent', function(req, res) {
    res.render('createstudent', { title: 'Add New Student' });
});


/* POST to Add User Service */
router.post('/addstudent', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var uni = req.body.uni;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var gender = req.body.gender;
    var dob = req.body.dob;
    var email = req.body.email;
    var homenbr = req.body.homenbr;
    var mobilenbr = req.body.mobilenbr;
    var curntaddr = req.body.curntaddr;
    var prmntaddr = req.body.prmntaddr;
    var degree = req.body.degree;
    var term = req.body.term;
    var school = req.body.school;
    var major = req.body.major;
    var minor = req.body.minor;
    var graddt = req.body.graddt;



    // Set our collection
    var collection = db.get('student');

    // Submit to the DB
    collection.insert({
    	"uni" : uni,
		"fname" : fname,
		"lname" : lname,
		"gender" : gender,
		"dob" : dob,
		"email" : email,
		"homenbr" : homenbr,
		"mobilenbr" : mobilenbr,
		"curntaddr" : curntaddr,
		"prmntaddr" : prmntaddr,
		"degree" : degree,
		"term" : term,
		"school" : school,
		"major" : major,
		"minor" : minor,
		"graddt" : graddt
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("getstudents");
        }
    });
});

module.exports = router;
