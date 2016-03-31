Microservice Apps and APIs
Student Microservice using Node.js
============================
This microservice maintains student information. Also, it maintains the course ids for which the student has registered using the registration microservice. The service support basic CRUD operations for the Student entity.

Technologies Used
-----------------
- Node.js for exposing RESTful API
- Express for web framework
- Jade for creating templates
- Jquery for ajax calls
- Bootstrap for responsive UI
- MongoDB for storing student information
- Mongoose for enforcing schema constraints
- RabbitMQ for ensuring eventual consistency across services

How To Run
----------
Please install RabbitMQ and MongoDB before starting the service. This service comes bundled with a startStudentService.bat which can be used to launch multiple instances of the same service on a Windows machine. Please refer the same for launching a single instance or multiple instances on different platform.

Remarks on the Code
-------------------
- routes/students.js - contains CRUD API for student service
- views/ - contains the jade templates for CRUD views
- public/apidoc - contains API documentation
- public/js - contains the Javascript files
- public/css - contains the CSS files
- public/img - contains the images
