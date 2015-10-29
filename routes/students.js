var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

/* GET students listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET student list page. */
router.get('/getstudents', function(req, res) {
    res.render('studentlist');
});

router.get('/createstudent', function(req, res) {
    res.render('createstudent', { title: 'Add New Student' });
});


/* POST to Add student Service */
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
            res.redirect("/students/getstudents");
        }
    });
});


router.get('/studentlist', function(req, res, next) {
    var db = req.db;
    var collection = db.get('student');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.param('uni', function(req, res, next, uni) {
    var db = req.db;
    var collection = db.get('student');

    collection.find({uni:req.uni},{},function(e,docs){
        //if it isn't found, we are going to repond with 404
        if (e) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }else {
            req.uni = uni;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/edit/:uni/')
	.get(function(req, res) {
			var db = req.db;
		    var collection = db.get('student');
		    console.log("Inside get");

		    collection.findOne({uni:req.uni},{},function(e,docs){
		    	if (e) {
		            // If it failed, return error
		            res.send("There was a problem adding the information to the database.");
		        }else{
		           res.render('editstudent',{student : docs, title: "Update Student"});
		    	}
		 });
	})
	.put(function(req, res) {
		// Set our internal DB variable
	    var db = req.db;

	    // Get our REST or form values. These rely on the "name" attributes
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

	   //find the document by ID
	   // Set our collection
	   console.log("inside put");
	   var collection = db.get('student');
	   collection.update({uni: req.uni}, 
	   		{$set : {
	   				"fname" : fname,
					"lname" : lname,
					"gender" : gender,
					"dob" : dob,
					"email" : email,
					"homenbr" : homenbr,
					"mobilenbr" : mobilenbr,
					"curntaddr" : curntaddr,
					"prmntaddr" : prmntaddr
	   			}
	   		}, 

		   	function(err,doc){
		        if (err) {
		            // If it failed, return error
		           res.send("There was a problem adding the information to the database.");
		        }else{
		           res.redirect("/students/getstudents");
		    	}
		    });
	});

/*
 * DELETE to delete student.
 */
router.delete('/deletestudent/:uni', function(req, res) {
    var db = req.db;
    var collection = db.get('student');
    var studentToDelete = req.params.uni;
    collection.remove({ 'uni' : studentToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
