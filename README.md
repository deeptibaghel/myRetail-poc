# myRetail RESTful service

myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast.
myRetail wants to make its internal data available to any number of client devices, from myRetail.com to native mobile apps. 

The goal of this project is to create an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller. 

As the product price data is more dynamic in nature, MySQL is used to store the same.
Product details being static in nature, MongoDB is used to store it. 
Development is done on [Node.js](https://nodejs.org/en/) express web application framework. 
The hosted version of the app is available at [https://warm-falls-23626.herokuapp.com/](https://warm-falls-23626.herokuapp.com/).


* [JWT](https://jwt.io/) has been used for user authentication. 
* Mocha has been used as a Unit Testing framework.
* Eslint has been used as a linting tool.
* Self signed certificate has been used for https deployment in local mode.

  
## Local Installation
```
1. Install Node.js and npm (Tested on Node v8.10.0 and npm 6.1.0).  
2. Clone the repository.
3. Install the required node modules using "npm install".
4. Install MongoDB and set the connection string in file config/mongodb.js . 
   Below are the steps for docker version:
    docker pull mongodb  
    docker run -d -p 27017:27017 --name mongo mongo  
        
5. Install MySQL database and set mysql connection parameters in file config/mysql.js
4. Create the database and tables using file mysql_script.sql
6. Start the service using "npm start".
```

## Unit Testing
Unit tests can be executed via command "npm test". Results should appear as below:
    
    > export NODE_ENV=test && mocha app/**/*.test.js --exit
    
      GET /users/
        ✓ should require authorization
        ✓ responds with JSON
    
      POST /products/create_info
        ✓ should create product description
    
      POST /products/create
        ✓ should create product price
    
      PUT /products/update/:id
        ✓ should update product price (41ms)
    
      DELETE /products/delete/:id
        ✓ should delete product price
    
      GET /products/:id
        ✓ should retrieve product price
    
      GET /products/detail/:id
        ✓ should retrieve product price with description
    
    
      8 passing (1s)


##  Application Testing  
- Install [Postman](https://www.getpostman.com/) utility.
- Download and import the **Postman collection** for testing the endpoints from the links given below:
    - local test: [https://www.getpostman.com/collections/d77b9af7ef9d68099ffc](https://www.getpostman.com/collections/d77b9af7ef9d68099ffc)
    - heroku test: [https://www.getpostman.com/collections/11c0eccd939a5bdd2d70](https://www.getpostman.com/collections/11c0eccd939a5bdd2d70)

- Perform login to the application using the endpoint `/users/authenticate`, username: test, password: test .
<br>The JWT token returned, may be saved in a global environment variable say "token" of postman.
Each endpoint should have an authorization of type "Bearer Token" and value = {{token}}.

## Large Scale Deployment

API gateway such as [tyk](https://tyk.io/) may be used to manage the API for faster response and better scalability.
CQRS framework like [Axon](https://axoniq.io/) may be used to create the read only replica of price database for faster read queries. 

