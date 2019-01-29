# myRetail RESTful service

myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast.
myRetail wants to make its internal data available to any number of client devices, from myRetail.com to native mobile apps. 

The goal of this project is to create an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller. 

As the product price data is more dynamic in nature, MySQL is used to store the same.
Product details being static in nature, MongoDB is used to store it. The hosted version of the app is available at [https://warm-falls-23626.herokuapp.com/]
Development is done on [Node.js](https://nodejs.org/en/) express web application framework. 

* JWT has been used for user authentication. 
* Self Signed certificate has been used for https deployment in local mode.
* Mocha has been used Unit Testing.
* Eslint has been used as a linting tool.

**Steps for local setup are as below**:
1. Clone the repository.
2. Install MongoDB and set the connection string in file config/mongodb.js. Below are the steps for docker version:
    docker pull mongodb  
    docker run -d -p 27017:27017 --name mongo mongo  
        
3. Install MySQL database and set mysql connection parameters in file config/mysql.js
4. Create the database and tables using file mysql_script.sql
5. Test using command "npm test".
6. Start the service using "npm start".

**Postman collection** for testing the endpoints can be downloaded from the links below:
* local test: [https://www.getpostman.com/collections/d77b9af7ef9d68099ffc]()
* heroku test: [https://www.getpostman.com/collections/11c0eccd939a5bdd2d70]()

The first endpoint to execute is /users/authenticate, username: test, password: test
The JWT token can then be saved in a global environment variable say "token" of postman.
Each endpoint should have an authorization of type "Bearer Token" and value = {{token}}

**Large Scale Deployment**

API gateway such as [tyk](https://tyk.io/) can be used to manage the API for faster response and better scalability.
CQRS pattern can be used to create the read only replica of price database for faster read queries.

