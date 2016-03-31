define({ "api": [
  {
    "type": "delete",
    "url": "/students/deletestudent/:uni/",
    "title": "Delete Student information",
    "name": "DeleteStudent",
    "group": "Student",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "uni",
            "description": "<p>UNI of the Student.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/students.js",
    "groupTitle": "Student"
  },
  {
    "type": "get",
    "url": "/students/student/:uni",
    "title": "Request Single Student Information using UNI from Database",
    "name": "GetStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "uni",
            "description": "<p>UNI of the Student.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "uni",
            "description": "<p>UNI of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "fname",
            "description": "<p>First Name of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "lname",
            "description": "<p>Last Name of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of Birth of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>Email ID of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "homenbr",
            "description": "<p>Home Phone Number of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "mobilenbr",
            "description": "<p>Mobile Number of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "curntaddr",
            "description": "<p>Current Address of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "prmntaddr",
            "description": "<p>Permanent Address of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "degree",
            "description": "<p>Degree of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "term",
            "description": "<p>Term of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "school",
            "description": "<p>School of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "major",
            "description": "<p>Major of the Student.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t{\n\t\t  \"uni\": \"nc2663\",\n\t\t  \"fname\": \"Nitesh\",\n\t\t  \"lname\": \"Chauhan\",\n\t\t  \"gender\": \"Male\",\n\t\t  \"dob\": \"2015-11-13\",\n\t\t  \"email\": \"nc2663@columbia.edu\",\n\t\t  \"homenbr\": \"6179091026\",\n\t\t  \"mobilenbr\": \"6179091026\",\n\t\t  \"curntaddr\": \"209 W\",\n\t\t  \"prmntaddr\": \"209 W\",\n\t\t  \"degree\": \"Masters\",\n\t\t  \"term\": \"2015\",\n\t\t  \"school\": \"SEAS\",\n\t\t  \"major\": \"CS\",\n\t\t  \"minor\": \"CS\",\n\t\t  \"graddt\": \"November - 2015\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/students.js",
    "groupTitle": "Student"
  },
  {
    "type": "get",
    "url": "/students/studentlist",
    "title": "Request All Student Information in Database",
    "name": "GetStudentList",
    "group": "Student",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "uni",
            "description": "<p>UNI of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "fname",
            "description": "<p>First Name of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "lname",
            "description": "<p>Last Name of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of Birth of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>Email ID of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "homenbr",
            "description": "<p>Home Phone Number of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "mobilenbr",
            "description": "<p>Mobile Number of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "curntaddr",
            "description": "<p>Current Address of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "prmntaddr",
            "description": "<p>Permanent Address of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "degree",
            "description": "<p>Degree of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "term",
            "description": "<p>Term of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "school",
            "description": "<p>School of the Student.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "major",
            "description": "<p>Major of the Student.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    [\n\t\t  {\n\t\t    \"uni\": \"nc2663\",\n\t\t    \"fname\": \"Nitesh\",\n\t\t    \"lname\": \"Chauhan\",\n\t\t    \"gender\": \"Male\",\n\t\t    \"dob\": \"2015-11-13\",\n\t\t    \"email\": \"nc2663@columbia.edu\",\n\t\t    \"homenbr\": \"6179091026\",\n\t\t    \"mobilenbr\": \"6179091026\",\n\t\t    \"curntaddr\": \"209 W\",\n\t\t    \"prmntaddr\": \"209 W\",\n\t\t    \"degree\": \"Masters\",\n\t\t    \"term\": \"2015\",\n\t\t    \"school\": \"SEAS\",\n\t\t    \"major\": \"CS\",\n\t\t    \"minor\": \"CS\",\n\t\t    \"graddt\": \"November - 2015\"\n\t\t  }\n\t\t]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/students.js",
    "groupTitle": "Student"
  },
  {
    "type": "put",
    "url": "/students/edit/:uni/",
    "title": "Modify Student information",
    "name": "PutStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "uni",
            "description": "<p>UNI of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "fname",
            "description": "<p>First Name of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "lname",
            "description": "<p>Last Name of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of Birth of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>Email ID of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "homenbr",
            "description": "<p>Home Phone Number of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "mobilenbr",
            "description": "<p>Mobile Number of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "curntaddr",
            "description": "<p>Current Address of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "prmntaddr",
            "description": "<p>Permanent Address of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "degree",
            "description": "<p>Degree of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "term",
            "description": "<p>Term of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "school",
            "description": "<p>School of the Student.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "major",
            "description": "<p>Major of the Student.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/students.js",
    "groupTitle": "Student"
  }
] });