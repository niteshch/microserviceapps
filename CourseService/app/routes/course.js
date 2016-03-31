//Requiring Log and Data Models
var Course = require('./../models/course');
var Log = require('./../models/log');
var amqp = require('amqplib/callback_api');

//Schema that is changeable by admin
var validCourseSchema = {
  coursename  :   1,
  coursecode  :   1,
  courseurl     :   1,
  coursesection      :   1,
  courseinstructor    :   1,
  courseyear : 1,
  coursesemester : 1,
  courselastupdate : 1,
  coursemaxsize : 1,
  coursecurrentenroll  :   1,
  courseenrolled  :   1,
  coursewaitlist :   1,
  callNo: 1,
  uni: 1
};

var validLogSchema = {
  uni : 1,
  change : 1,
  callNo : 1

};

function dropInvalidSchema(inputJson){
  for(key in inputJson) {
    if(!(key in validCourseSchema))
      delete inputJson[key];
  }
  return inputJson;
};



module.exports = function(app) {
//-----------------------------------------------
       /**
 * @api {get} /api/getCourses Read all Courses
 * @apiVersion 0.3.0
 * @apiName GetCourses
 * @apiGroup Courses
 * @apiPermission admin
 *
 *
 * @apiSuccess {String}   coursename    Name of Course
 * @apiSuccess {String}   coursecode    Course Code
 * @apiSuccess {String}   courseurl     Course url
 * @apiSuccess {String}   coursesection  Course Section
 * @apiSuccess {String}   courseinstructor Name of Instructor
 * @apiSuccess {String}   courseyear  Year
 * @apiSuccess {String}   coursesemester Semester in which course is offered
 * @apiSuccess {String}   coursemaxsize Maximum number of students permitted
 * @apiSuccess {String}   coursecurrentenroll Number of students currently enrolled
  * @apiSuccess {String[]} courseenrolled     List of Students enrolled
  * @apiSuccess {String[]} coursewaitlist  List of Students Waitlisted
  * @apiSuccess {Date}    courselastupdate  Last Update Timestamp
  @apiErrorExample Response (example):
 *     HTTP/1.1 401 Courses Absent
 *     {
 *       "error": "There exist no courses"
 *     }
 */
    //CRUD for Courses
    app.get('/api/getCourses', function(req, res, next) {
        Course.find({}, validCourseSchema,function(err, courses) {
            if(err) {
                        res.send(err);
                    }
            else {
                  res.json(courses);
                  
            }
        });
    });
   /**
 * @api {get} api/getCourses/:callNo Read data of a particular course
 * @apiVersion 0.3.0
 * @apiName GetCourse
 * @apiGroup Courses
 * @apiPermission Administrator
 * @apiSuccess {String}   coursename    Name of Course
 * @apiSuccess {String}   coursecode    Course Code
 * @apiSuccess {String}   courseurl     Course url
 * @apiSuccess {String}   coursesection  Course Section
 * @apiSuccess {String}   courseinstructor Name of Instructor
 * @apiSuccess {String}   courseyear  Year
 * @apiSuccess {String}   coursesemester Semester in which course is offered
 * @apiSuccess {String}   coursemaxsize Maximum number of students permitted
 * @apiSuccess {String}   coursecurrentenroll Number of students currently enrolled
  * @apiSuccess {String[]} courseenrolled     List of Students enrolled
  * @apiSuccess {String[]} coursewaitlist  List of Students Waitlisted
  * @apiSuccess {Date}    courselastupdate  Last Update Timestamp

 * @apiParam {String} callNo Call Number of the course
 *@apiSuccess {Date}  lastupdated  Timestamp of Last Update

 * @apiError CourseNotFound   The <code>callNo</code> of the Course was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Course does not exist
 *     {
 *       "error": "The called course does not exist in the database"
 *     }
 */
  app.get('/api/getCourses/:callNo', function(req, res) {
        Course.find({callNo : req.params.callNo}, validCourseSchema,function(err, course){
          if(err) {
            return console.error(err);
          }
          else {
            res.json(course);
          }
        });
});
    /**
 * @api {post} /api/createCourse Create a new Course
 * @apiVersion 0.3.0
 * @apiName PostCourse
 * @apiGroup Courses
 * @apiPermission none
 * @apiSuccess {String}   coursename    Name of Course
 * @apiSuccess {String}   coursecode    Course Code
 * @apiSuccess {String}   courseurl     Course url
 * @apiSuccess {String}   coursesection  Course Section
 * @apiSuccess {String}   courseinstructor Name of Instructor
 * @apiSuccess {String}   courseyear  Year
 * @apiSuccess {String}   coursesemester Semester in which course is offered
 * @apiSuccess {String}   coursemaxsize Maximum number of students permitted
  * @apiSuccess {Date}    courselastupdate  Last Update Timestamp
* @apiError CourseNotFound   The <code>callNo</code> of the Course that could not be created.
* @apiErrorExample Response (example):
 *     HTTP/1.1 401 Course creation failure
 *     {
 *       "error": "Course could not be created"
 *     }

  */

    app.post('/api/createCourse', function(req, res) {
        console.log(req.body);

        var newCourse=dropInvalidSchema(req.body);
        newCourse['lastUpdated']=new Date();

        Course.create(newCourse,function(err, course) {
            if (err) {
              res.send("Problem adding info to Db");
            } else {
                    res.json(course);
                console.log('Post creating new courses: '+ course);
            }
        });
    });
/**
 * @api {put} /api/updateCourse/:callNo Change a Course
 * @apiVersion 0.3.0
 * @apiName PutCourse
 * @apiGroup Courses
 * @apiPermission none
 *
 * @apiParam {String} callNo Call number of the course
 *
 *
 * @apiSuccess {String}   coursename    Name of Course
 * @apiSuccess {String}   coursecode    Course Code
 * @apiSuccess {String}   courseurl     Course url
 * @apiSuccess {String}   coursesection  Course Section
 * @apiSuccess {String}   courseinstructor Name of Instructor
 * @apiSuccess {String}   courseyear  Year
 * @apiSuccess {String}   coursesemester Semester in which course is offered
 * @apiSuccess {String}   coursemaxsize Maximum number of students permitted
 * @apiSuccess {Date}    courselastupdate  Last Update Timestamp
 * @apiError CourseNotFound   The <code>callNo</code> of the Course was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 No Course
 *     {
 *       "error": "Course does not exist"
 *     }
 */
  app.put('/api/updateCourse/:callNo', function(req, res) {
      console.log(req.body);
      var updated=dropInvalidSchema(req.body);
      updated['lastUpdated']=new Date();
      console.log(updated);
      Course.update({callNo: req.params.callNo}, {$set: updated} ,function(err, courseID){
        if (err) {
              res.send("There was a problem updating the information to the database: " + err);
        }else {
              res.json(courseID);
        } 
    });
  });
    
/**
 * @api {delete} /api/deleteCourse/:callNo Delete a Course
 * @apiVersion 0.3.0
 * @apiName DeleteCourse
 * @apiGroup Courses
 * @apiPermission none
 *
 * @apiParam {String} callNo Call number of the course
 *@apiSuccess {String}   coursename    Name of Course
 * @apiSuccess {String}   coursecode    Course Code
 * @apiSuccess {String}   courseurl     Course url
 * @apiSuccess {String}   coursesection  Course Section
 * @apiSuccess {String}   courseinstructor Name of Instructor
 * @apiSuccess {String}   courseyear  Year
 * @apiSuccess {String}   coursesemester Semester in which course is offered
 * @apiSuccess {String}   coursemaxsize Maximum number of students permitted
 * @apiSuccess {Date}    courselastupdate  Last Update Timestamp
 * @apiError CourseNotFound   The <code>callNo</code> of the Course was not found or not deleted.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 No Course
 *     {
 *       "error": "Course does not exist"
 *     }
 */
    app.delete('/api/deleteCourse/:callNo', function(req, res) {
      console.log(req.body);
      var callNo = req.params.callNo;
      console.log(callNo);
      Course.remove({callNo:req.params.callNo},function(err, course){
        if(err){
          res.send(err);
        } else {
          res.json(course);
          console.log('Delete removing ID:' + course._id);
          amqp.connect('amqp://localhost', function(err, conn) {
            conn.createChannel(function(err, ch) {
              var ex = 'course';

              ch.assertExchange(ex, 'fanout', {durable: false})
              ch.publish(ex,'', new Buffer(JSON.stringify({ 'operation':'delete','result': [{'course' : callNo}] })));
            });
            setTimeout(function() { conn.close(); }, 500);
          });

        }
      });
    });
/**
 * @api {put} /api/enroll/:callNo/:uni Enroll a student in a course
 * @apiVersion 0.3.0
 * @apiName PutEnroll
 * @apiGroup Courses
 * @apiPermission none
 * @apiParam {String} callNo Call number of the course
 * @apiParam {String} uni   UNI of the student
 * @apiSuccess {String}   coursename    Name of Course
 * @apiSuccess {String}   coursecode    Course Code
 * @apiSuccess {String}   courseurl     Course url
 * @apiSuccess {String}   coursesection  Course Section
 * @apiSuccess {String}   courseinstructor Name of Instructor
 * @apiSuccess {String}   courseyear  Year
 * @apiSuccess {String}   coursesemester Semester in which course is offered
 * @apiSuccess {String}   coursemaxsize Maximum number of students permitted
 * @apiSuccess {Date}     courselastupdate  Last Update Timestamp
 * @apiSuccess {String}   coursecurrentenroll Number of students currently enrolled
 * @apiSuccess {String[]} courseenrolled     List of Students enrolled
 * @apiSuccess {String[]} coursewaitlist  List of Students Waitlisted
 *
 * @apiError CourseNotFound   The <code>uni</code> of the student was not found.
 *
 * @apiError CourseNotFound   The <code>uni</code> of the student was not enrolled.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 No Course
 *     {
 *       "error": "student could not be enrolled to the course"
 *     }
 */
    app.put('/api/enroll/:callNo/:uni', function(req,res){
      console.log(req.body);
        Course.update({callNo:req.params.callNo},{$set:{'lastUpdated':new Date()},$push:{'enrolled':req.params.uni}},function(err,data){
                if(err) res.send(err);
                  Log.create({uni:req.params.uni,changes:"enrolled",callNo:req.params.callNo});
                res.json(data);
        });
    });
/**
 * @api {delete} /api/dropEnroll/:callNo Remove students enrolled from a course
 * @apiVersion 0.3.0
 * @apiName DeleteEnroll
 * @apiGroup Courses
 * @apiPermission none
 *
 * @apiParam {String} callNo Call number of the course
 *
 * @apiError CourseNotFound   The <code>callNo</code> of the Course was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 No Course
 *     {
 *       "error": "Course does not exist"
 *     }
 */
    app.delete('/api/dropEnroll/:callNo', function(req, res) {

      var students = req.body.students;

      console.log(req.body);

      Course.update({callNo:req.params.callNo},{$set:{'lastUpdated':new Date()},$pull:{'enrolled':{$in : students }}},function(err,removed){
          if(err) res.send(err);

          for (var i = 0; i < students.length; i++)
          {


            Log.create({uni:students[i],changes:"dropped",callNo:req.params.callNo});
          }

          res.json(removed);

      });


    });
/**
 * @api {delete} /api/dropWaitlist/:callNo Drop students from waitlist
 * @apiVersion 0.3.0
 * @apiName DeleteWaitlist
 * @apiGroup Courses
 * @apiPermission none
 *
 * @apiParam {String} callNo Call number of the course
 *
 * @apiError CourseNotFound   The <code>callNo</code> of the Course was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 No Course
 *     {
 *       "error": "Course does not exist"
 *     }
 */
    app.delete('/api/dropWaitlist/:callNo', function(req, res) {

      var students = req.body.students;

      console.log(req.body);

      Course.update({callNo:req.params.callNo},{$set:{'lastUpdated':new Date()},$pull:{'waitlisted':{$in : students }}},function(err,removed){
          if(err) res.send(err);

          for (var i = 0; i < students.length; i++)
          {

            Log.create({uni:students[i],changes:"dropWaitlisted",callNo:req.params.callNo});

          }



          res.json(removed);

      });


    });



//---------------------ADMIN APIs---------------------

//--------------------DataModel Changes API---------------------
    /**
 * @api {post} /api/admin/Courseschema For Data Model changes
 * @apiVersion 0.3.0
 * @apiName PostDrop
 * @apiGroup Administrator
 * @apiPermission Administrator
 *
 * @apiSuccess 300

 *

 */
    app.post('/api/admin/Courseschema',function(req,res){

      validCourseSchema = req.body.newSchema;
      res.send(300);

    });

    app.post('/addcolumn', function(req, res) {
      var newcolumn = req.body;
      console.log(JSON.stringify(newcolumn));
      

      Course.update({}, {$set : newcolumn},{multi: true} , function(err,doc){
         if (err) {
              res.send("There was a problem adding the information to the database."+err);
          } else {
              Course.find({}, function(err, courses) {
                if(err){
                  res.send("There was a problem fetching the list of students from database." + err);
                }else{
                    res.send(courses);
                  }
              });
          }
      });
    });

    app.delete('/dropcolumn/:columnname', function(req, res) {
      var newcolumn = req.params.columnname;
      var json = "{\""+newcolumn+"\":1}";
      console.log(JSON.parse(json));

      Course.update({}, {$unset : JSON.parse(json)},{multi: true} , function(err,doc){
         if (err) {
              res.send("There was a problem adding the information to the database."+err);
          } else {
              Course.find({}, function(err, students) {
            if(err){
              res.send("There was a problem fetching the list of students from database." + err);
            }else{
                res.send(students);
              }
          });
          }
      });
    });



    //Serve API Docs
	app.get('/apidocs', function(req, res){

		res.sendfile('docs/index.html');

	});
    //Send error message for any other requests
    app.get('/*', function(req, res){

		res.json({"error":"Invalid Request"});

	});

};

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
          var finalUniArray = [];

          for(var i in result){
            var entry = result[i];
            var student_uni = entry.uni;
            var course = entry.course;
          
            finalUniArray.push(student_uni);
            Course.update({callNo: course}, 
              {$pullAll : {
                  "uni" : finalUniArray
                }
              }, 
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
            //console.log("UNI:"+student_uni+" Course:"+course);
            Course.findOne({callNo : course}, validCourseSchema,function(err, doc){
              if(err) {
                return console.error(err);
              }
              else {
                if(doc){
                  Course.update({callNo: course}, 
                    {$addToSet : {
                        "uni" : student_uni
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
                      var ex = 'course';

                      ch.assertExchange(ex, 'fanout', {durable: false})
                      ch.publish(ex,'', new Buffer(JSON.stringify({ 'operation':'delete','result': [{'course' : course}] })));
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
    var ex = 'student';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
        var json = JSON.parse(msg.content.toString());
        var result = json.result;
        var operation = json.operation;
        
        if(operation === 'delete'){
          var finalUniArray = [];

          for(var i in result){
            var entry = result[i];
            var student_uni = entry.uni;
            var course = entry.course;
          
            finalUniArray.push(student_uni);
            console.log(student_uni);
            Course.update({}, 
              {$pull : {
                  "uni" : student_uni
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