Microservice Apps and APIs
Course Microservice using Node.js
============================
This microservice maintains course information. Also, it maintains the student ids of students registered for the course using the registration microservice. The service support basic CRUD operations for the Course entity.

Technologies Used
-----------------
- Node.js for exposing RESTful API
- Express for web framework
- Jade for creating templates
- Jquery for ajax calls
- Bootstrap for responsive UI
- MongoDB for storing course information
- Mongoose for enforcing schema constraints
- RabbitMQ for ensuring eventual consistency across services

How To Run
----------
Please install RabbitMQ and MongoDB before starting the service. Run server.js

Remarks on the Code
-------------------
- app/routes/course.js - contains CRUD API for student service
- views/ - contains the jade templates for CRUD views
- doc/ - contains API documentation
- public/bootstrap - contains the bootstrap files
