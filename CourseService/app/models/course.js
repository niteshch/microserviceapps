
var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var CourseSchema = new Schema({},{strict:false});

module.exports=mongoose.model('courses',CourseSchema);

//module.export=mongoose.model('course', CourseSchema)
