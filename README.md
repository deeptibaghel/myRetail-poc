# myRetail RESTful service

myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast.
myRetail wants to make its internal data available to any number of client devices, from myRetail.com to native mobile apps. 

The goal of this project is to create an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller. 

As the product price data is more dynamic in nature, mySQL is used to store the same.
Product details being static in nature, MongoDB is used to store it.

* REST API is developed using Node.js express web application framework. 
* JWT has been used for user authentication. 
* Self Signed certificate has been used for https deployment.
* Mocha has been used as Unit Testing library.
* Eslint has been used as a linting tool.
* Postman can be used for testing the end points.
* The hosted version is available at [https://warm-falls-23626.herokuapp.com/]

**Steps for local setup are as below**:
1. Clone the repository.
2. Install docker and start the service.
3. Install MongoDB using docker :
    docker pull mongodb
    docker run -d -p 27017:27017 --name mongo mongo
4. Edit connection string in config/mongodb.js
        
5. Install MySQL database
6. Create the databases for test and local instance using script mysql_script.sql
7. Edit  mysql connection parameters in file config/mysql.js

8. Test using command "npm test"
9. Start the service using "npm start"

Postman collection can be downloaded from the links below:
* local test: [https://www.getpostman.com/collections/d77b9af7ef9d68099ffc]()
* heroku test: [https://www.getpostman.com/collections/11c0eccd939a5bdd2d70]()

The first endpoint to execute is /users/authenticate, username: test, password: test
The JWT token can then be saved in a global environment variable say "token" of postman.
Each endpoint should have an authorization of type "Bearer Token" and value = {{token}}

**Large Scale Deployment**

API gateway such as [tyk](https://tyk.io/) can be used to manage the API for faster response and better scalability.
CQRS pattern can be used to create the read only replica of price database for faster read queries.

