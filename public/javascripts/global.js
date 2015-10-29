
// Studentlist data array for filling in info box
var studentListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    // UNI link click
    $('#studentList table tbody').on('click', 'td a.linkshowstudent', showStudentInfo);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/students/studentlist', function( data ) {
        studentListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowstudent" rel="' + this.uni + '">' + this.uni + '</a></td>';
            tableContent += '<td>' + this.fname + ' '+ this.lname + '</td>';
            tableContent += '<td><a href="#" class="linkdeletestudent" rel="' + this._id + '">Delete Student</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#studentList table tbody').html(tableContent);
    });
};


// Show Student Info
function showStudentInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve uni from link rel attribute
    var uni = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = studentListData.map(function(arrayItem) { return arrayItem.uni; }).indexOf(uni);

    // Get our student Object
    var thisStudentObject = studentListData[arrayPosition];

    //Populate Info Box
    //$('#studentInfoName').text(thisStudentObject.fname +' ' +thisStudentObject.lname);
    $('#uni').text(thisStudentObject.uni);
    $('#fname').text(thisStudentObject.fname);
    $('#lname').text(thisStudentObject.lname);
    $('#gender').text(thisStudentObject.gender);
    $('#dob').text(thisStudentObject.dob);
    $('#email').text(thisStudentObject.email);
    $('#homenbr').text(thisStudentObject.homenbr);
    $('#mobilenbr').text(thisStudentObject.mobilenbr);
    $('#curntaddr').text(thisStudentObject.curntaddr);
    $('#prmntaddr').text(thisStudentObject.prmntaddr);
    $('#degree').text(thisStudentObject.degree);
    $('#term').text(thisStudentObject.term);
    $('#school').text(thisStudentObject.school);
    $('#major').text(thisStudentObject.major);
    $('#minor').text(thisStudentObject.minor);
    $('#graddt').text(thisStudentObject.graddt);
};