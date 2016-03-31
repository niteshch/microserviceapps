var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');

var mongoose = require('mongoose');
var dbName = process.env.DBNAME || 'student';
console.log(dbName);
mongoose.connect('mongodb://localhost:27017/'+dbName);
var conn = mongoose.connection;
var router = express.Router();
var Schema = mongoose.Schema;
var studentSchemaJSON = {
  uni: { type: String, unique: true, index: true, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  gender: { type: String},
  dob: { type: Date, required: true },
  email: { type: String,
        trim: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  homenbr: Number,
  mobilenbr: Number,
  curntaddr: String,
  prmntaddr: String,
  degree: String,
  term: String,
  school: String,
  major: String,
  minor: String,
  graddt: Date,
  courses:[String]
};
var studentSchema = new Schema(studentSchemaJSON,{strict:false});
var StudentModel = conn.model('student', studentSchema);

var modelCount = 0;

var student;

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

router.post('/addcolumn', function(req, res) {
	var newcolumn = req.body;
	console.log(JSON.stringify(newcolumn));
	

	StudentModel.update({}, {$set : newcolumn},{multi: true} , function(err,doc){
		 if (err) {
	        res.send("There was a problem adding the information to the database."+err);
	    } else {
	        StudentModel.find({}, function(err, students) {
				if(err){
					res.send("There was a problem fetching the list of students from database." + err);
				}else{
				    res.send(students);
			    }
			});
	    }
	});
});

router.delete('/dropcolumn/:columnname', function(req, res) {
	var newcolumn = req.params.columnname;
	var json = "{\""+newcolumn+"\":1}";
	console.log(JSON.parse(json));

	StudentModel.update({}, {$unset : JSON.parse(json)},{multi: true} , function(err,doc){
		 if (err) {
	        res.send("There was a problem adding the information to the database."+err);
	    } else {
	        StudentModel.find({}, function(err, students) {
				if(err){
					res.send("There was a problem fetching the list of students from database." + err);
				}else{
				    res.send(students);
			    }
			});
	    }
	});
});


/* POST to Add student Service */
router.post('/addstudent', function(req, res) {

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
    //var collection = db.get('student');
    var student = new StudentModel({
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
		"graddt" : graddt,
		"courses" : []
    });

    //StudentModel = conn.model('student', studentSchema);
    //student = new StudentModel();

    /*for(var propName in req.body){
		student[propName] = req.body[propName];
		console.log(propName + " " + req.body[propName]);
	}*/

    student.save(function (err) {
	    if (err) {
	        res.send("There was a problem adding the information to the database."+err);
	    } else {
	        StudentModel.find({}, function(err, students) {
				if(err){
					res.send("There was a problem fetching the list of students from database." + err);
				}else{
				    res.send(students);
			    }
			});
	    }
	});

});

/**
 * @api {get} /students/studentlist Request All Student Information in Database
 * @apiName GetStudentList
 * @apiGroup Student
 *
 *
 * @apiSuccess {String} uni UNI of the Student.
 * @apiSuccess {String} fname First Name of the Student.
 * @apiSuccess {String} lname Last Name of the Student.
 * @apiSuccess {String} gender Gender of the Student.
 * @apiSuccess {String} dob Date of Birth of the Student.
 * @apiSuccess {String} email Email ID of the Student.
 * @apiSuccess {String} homenbr Home Phone Number of the Student.
 * @apiSuccess {String} mobilenbr Mobile Number of the Student.
 * @apiSuccess {String} curntaddr Current Address of the Student.
 * @apiSuccess {String} prmntaddr Permanent Address of the Student.
 * @apiSuccess {String} degree Degree of the Student.
 * @apiSuccess {String} term Term of the Student.
 * @apiSuccess {String} school School of the Student.
 * @apiSuccess {String} major Major of the Student.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *		  {
 *		    "uni": "nc2663",
 *		    "fname": "Nitesh",
 *		    "lname": "Chauhan",
 *		    "gender": "Male",
 *		    "dob": "2015-11-13",
 *		    "email": "nc2663@columbia.edu",
 *		    "homenbr": "6179091026",
 *		    "mobilenbr": "6179091026",
 *		    "curntaddr": "209 W",
 *		    "prmntaddr": "209 W",
 *		    "degree": "Masters",
 *		    "term": "2015",
 *		    "school": "SEAS",
 *		    "major": "CS",
 *		    "minor": "CS",
 *		    "graddt": "November - 2015"
 *		  }
 *		]
 * @apiVersion 0.0.1
 *
 */
router.get('/studentlist', function(req, res, next) {
	StudentModel.find({}, function(err, students) {
		if(err){
			res.send("There was a problem fetching the list of students from database." + err);
		}else{
		    res.send(students);
	    }
	});
});

router.param('uni', function(req, res, next, uni) {
    StudentModel.find({uni:req.uni}, function(err, students) {
	    if (err) {
            // If it failed, return error
            res.send("There was a problem finding the information from the database." + err);
        }else {
            req.uni = uni;
            // go to the next thing
            next(); 
        } 
	});

});


/**
 * @api {get} /students/student/:uni Request Single Student Information using UNI from Database
 * @apiName GetStudent
 * @apiGroup Student
 *
 * @apiParam {String} uni UNI of the Student.
 *
 *
 * @apiSuccess {String} uni UNI of the Student.
 * @apiSuccess {String} fname First Name of the Student.
 * @apiSuccess {String} lname Last Name of the Student.
 * @apiSuccess {String} gender Gender of the Student.
 * @apiSuccess {String} dob Date of Birth of the Student.
 * @apiSuccess {String} email Email ID of the Student.
 * @apiSuccess {String} homenbr Home Phone Number of the Student.
 * @apiSuccess {String} mobilenbr Mobile Number of the Student.
 * @apiSuccess {String} curntaddr Current Address of the Student.
 * @apiSuccess {String} prmntaddr Permanent Address of the Student.
 * @apiSuccess {String} degree Degree of the Student.
 * @apiSuccess {String} term Term of the Student.
 * @apiSuccess {String} school School of the Student.
 * @apiSuccess {String} major Major of the Student.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *		{
 *		  "uni": "nc2663",
 *		  "fname": "Nitesh",
 *		  "lname": "Chauhan",
 *		  "gender": "Male",
 *		  "dob": "2015-11-13",
 *		  "email": "nc2663@columbia.edu",
 *		  "homenbr": "6179091026",
 *		  "mobilenbr": "6179091026",
 *		  "curntaddr": "209 W",
 *		  "prmntaddr": "209 W",
 *		  "degree": "Masters",
 *		  "term": "2015",
 *		  "school": "SEAS",
 *		  "major": "CS",
 *		  "minor": "CS",
 *		  "graddt": "November - 2015"
 *		}
 * @apiVersion 0.0.1
 *
 */
router.get('/student/:uni/', function(req, res) {
    StudentModel.findOne({uni:req.uni}, function(err, students) {
	    if (err) {
            // If it failed, return error
            res.send("There was a problem finding the information from the database." + err);
        }else{
           res.json(students);
    	}
	});



});

router.route('/edit/:uni/')
	.get(function(req, res) {
		 	StudentModel.findOne({uni:req.uni}, function(err, students) {
			    if (err) {
		            // If it failed, return error
		            res.send("There was a problem finding the information from the database." + err);
		        }else{
		           res.render('editstudent',{student : students, title: "Update Student"});
		    	}
			});
	})
	/**
	 * @api {put} /students/edit/:uni/ Modify Student information
	 * @apiName PutStudent
	 * @apiGroup Student
	 *
	 *
	 * @apiParam {String} uni UNI of the Student.
	 * @apiParam {String} fname First Name of the Student.
	 * @apiParam {String} lname Last Name of the Student.
	 * @apiParam {String} gender Gender of the Student.
	 * @apiParam {String} dob Date of Birth of the Student.
	 * @apiParam {String} email Email ID of the Student.
	 * @apiParam {String} homenbr Home Phone Number of the Student.
	 * @apiParam {String} mobilenbr Mobile Number of the Student.
	 * @apiParam {String} curntaddr Current Address of the Student.
	 * @apiParam {String} prmntaddr Permanent Address of the Student.
	 * @apiParam {String} degree Degree of the Student.
	 * @apiParam {String} term Term of the Student.
	 * @apiParam {String} school School of the Student.
	 * @apiParam {String} major Major of the Student.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 * @apiVersion 0.0.1
	 *
	 */
	.put(function(req, res) {

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
	   StudentModel.update({uni: req.uni}, 
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
		           res.send("There was a problem updating the information to the database."+err);
		        }else{
		           StudentModel.findOne({uni:req.uni}, function(err, students) {
					    if (err) {
				            // If it failed, return error
				            res.send("There was a problem finding the information from the database." + err);
				        }else{
				           res.json(students);
				    	}
					});
		    	}
		    });
	});

/**
 * @api {delete} /students/deletestudent/:uni/ Delete Student information
 * @apiName DeleteStudent
 * @apiGroup Student
 *
 *
 * @apiSuccess {String} uni UNI of the Student.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * @apiVersion 0.0.1
 */
router.delete('/deletestudent/:uni', function(req, res) {
    var studentToDelete = req.params.uni;
    StudentModel.remove({'uni' : studentToDelete}, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });

		amqp.connect('amqp://localhost', function(err, conn) {
		  conn.createChannel(function(err, ch) {
		    var ex = 'student';

		    ch.assertExchange(ex, 'fanout', {durable: false})
		    ch.publish(ex,'', new Buffer(JSON.stringify({ 'operation':'delete','result': [{'uni' : studentToDelete}] })));
		  });
		  setTimeout(function() { conn.close(); }, 500);
		});
    });
});

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'registration';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
      	var json = JSON.parse(msg.content.toString());
      	var result = json.result;
      	var operation = json.operation;
      	
      	if(operation === 'delete'){
      		var finalCourseArray = [];

      		for(var i in result){
      			var entry = result[i];
			    var student_uni = entry.uni;
			    var course = entry.course;
			    
       			finalCourseArray.push(course);
       			StudentModel.update({uni: student_uni}, 
			   		{$pullAll : {
			   				"courses" : finalCourseArray
			   			}
			   		}, {multi: true} ,
				   	function(err,doc){
				        if (err) {
			            // If it failed, return error
			           console.log("There was a problem updating the information to the database."+err);
			        }
		    	});
			}
      	}else if(operation === 'add'){
      		for(var i in result){
      			var entry = result[i];
			    var student_uni = entry.uni;
			    var course = entry.course;
			    
			    StudentModel.findOne({uni:student_uni}, function(err, students) {
				    if (err) {
			            // If it failed, return error
			            console.log("There was a problem finding the information from the database." + err);
			        }else{
			           if(students){
			           		StudentModel.update({uni: student_uni}, 
						   		{$addToSet : {
						   				"courses" : course
						   			}
						   		}, 
							   	function(err,doc){
							        if (err) {
							            // If it failed, return error
							           console.log("There was a problem updating the information to the database."+err);
							    }
						    });
			           }else{
				          amqp.connect('amqp://localhost', function(err, conn) {
							  conn.createChannel(function(err, ch) {
							    var ex = 'student';

							    ch.assertExchange(ex, 'fanout', {durable: false})
							    ch.publish(ex,'', new Buffer(JSON.stringify({ 'operation':'delete','result': [{'uni' : student_uni}] })));
							  });
							  setTimeout(function() { conn.close(); }, 500);
						 });
			           }
			    	}
				});
			}
      	}
      	

        console.log(" [x] %s", msg.content.toString());
      }, {noAck: true});
    });
  });
});


amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'course';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
      	var json = JSON.parse(msg.content.toString());
      	var result = json.result;
      	var operation = json.operation;
      	
      	if(operation === 'delete'){
      		var finalCourseArray = [];

      		for(var i in result){
      			var entry = result[i];
			    var course = entry.course;
			    
       			finalCourseArray.push(course);
       			StudentModel.update({}, 
			   		{$pullAll : {
			   				"courses" : finalCourseArray
			   			}
			   		}, {multi: true} ,
				   	function(err,doc){
				        if (err) {
				            // If it failed, return error
				           console.log("There was a problem updating the information to the database."+err);
			        }
		    	});
			}
      	}

        console.log(" [x] %s", msg.content.toString());
      }, {noAck: true});
    });
  });
});


module.exports = router;
