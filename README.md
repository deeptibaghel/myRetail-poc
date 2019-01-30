# myRetail RESTful service

myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast.
myRetail wants to make its internal data available to any number of client devices, from myRetail.com to native mobile apps. 

The goal of this project is to create an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller. 

As the product price data is more dynamic in nature, MySQL is used to store the same.
Product details being static in nature, MongoDB is used to store it. 
The hosted version of the app is available at [https://warm-falls-23626.herokuapp.com/](https://warm-falls-23626.herokuapp.com/).

### Technology Stack
- [Node.js](https://nodejs.org/en/) with [Express](https://expressjs.com/) web application framework
- MongoDB 4.0.5
- MySQL 5.7
- [JWT](https://jwt.io/) for user authentication. 
- Mocha as a Unit Testing framework.
- Eslint for code linting.
- Self signed certificate for https deployment in local mode.

### Schematic Diagram
![Schematic](img/architecture.png)

  
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


##  API Testing  
- Install [Postman](https://www.getpostman.com/) utility.
- Download and import the **Postman collection** for testing the endpoints from the links given below:
    - local test: [https://www.getpostman.com/collections/d77b9af7ef9d68099ffc](https://www.getpostman.com/collections/d77b9af7ef9d68099ffc)
    - heroku test: [https://www.getpostman.com/collections/11c0eccd939a5bdd2d70](https://www.getpostman.com/collections/11c0eccd939a5bdd2d70)

- Perform login to the application using the endpoint `/users/authenticate`, username: test, password: test .
<br>The JWT token returned, may be saved in a global environment variable say "token" of postman.
Each endpoint should have an authorization of type "Bearer Token" and value = {{token}}.

## REST Endpoints

### Authentication Service
POST /users/authenticate - Authenticates User

    Request
    /users/authenticate 
    {
    	"username": "username",
    	"password": "password"
    }
    
    Success Response
    {
        "id": 1,
        "username": "username",
        "password": "password",
        "firstName": "Test",
        "lastName": "User",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTU0ODc2ODU0NX0.WjF7qGrNpB1vv-JZNQAXKw2n0AaQ6AqWizdd-q1kCtM"
    }
    
    Response on authentication failure
    {
        "message": "Username or password is incorrect"
    }

### Product Pricing Service  
POST /products/create - Creates product price 

    Request
    /products/create
    {
    	"id": 15117736,
    	"current_price": { 
    	    "value": 5.5, 
    	    "currency_code": "USD" 
    	}
    }
    
    Success Response
    {
        "message": "Price record inserted"
    }
    
    Response if record exists
    {
        "message": "Product price for id 15117736 already exists"
    }


PUT /products/update/:id - Updates product price using id

    Request
    /products/update/15117736
    {
    	"current_price": { 
    	    "value" : 9.3, 
    	    "currency_code": "USD"
    	 }
    }
    
    Success Response
    {
        "message": "Product price updated"
    }
    
    Response if record does not exist
    {
        "message": "Product price for id 15117737 not found"
    }

GET /products/:id - Retrieves product price using id 
    
    Request
    /products/15117736
    
    Success Response
    {
        "id": "15117736",
        "current_price": {
            "value": 5.5,
            "currency_code": "USD"
        }
    }
    
    Response if record does not exist
    {
        "message": "Product price for id 15117736 not found"
    }
    
DELETE /products/delete/:id - Deletes product price using id

    Request
    /products/15117736
    
    Success Response
    {
        "message": "Price deleted"
    }
    
    Response if record does not exist
    {
        "message": "Price not found"
    }
    

### Product Information Service  
POST /products/create_info - Creates product information 

    Request
    /products/create_info
    {
    	"id": 15117736,
    	"description": "Iphone 8"
    }
    
    Success Response
    {
        "_id": "5c514843df84180017564fbd",
        "id": 15117737,
        "description": "Iphone 8",
        "createdAt": "2019-01-30T06:46:27.667Z",
        "updatedAt": "2019-01-30T06:46:27.667Z",
    }
    
    Response if record exists
    {
        "message": "Product with id 15117736 already exists"
    }
    
PUT /products/update_info/:id - Updates product information using id
    
    Request
    /products/update_info/15117736
    {
    	"description": "Samsung Galaxy"
    }
    
    Success Response
    {
        "_id": "5c4f0a2e8499b7001713e379",
        "id": 15117736,
        "description": "Samsung Galaxy",
        "createdAt": "2019-01-28T13:57:02.295Z",
        "updatedAt": "2019-01-30T06:49:50.890Z",
    }
    
    Response if record does not exist
    {
        "message": "Product not found with id 15117736"
    }


### Combined Product price+information service

GET products/detail/:id - Retrieves product price and information using id
    
    Request
    products/detail/15117736
    
    Success Response
    {
        "id": "15117736",
        "current_price": {
            "value": 5.5,
            "currency_code": "USD"
        },
        "product_desc": "Samsung Galaxy"
    }
    
    Response if product price not found
    {
        "message": "Product price for id 15117736 not found"
    }
    
    Response if product information not found
    {
        "message": "Product not found with id 15117738"
    }
    

### JWT Workflow
![Jwt](img/jwt.jpg)


## Large Scale Deployment

API gateway such as [tyk](https://tyk.io/) may be used to manage the API for faster response and better scalability.
CQRS framework like [Axon](https://axoniq.io/) may be used to create the read only replica of price database for faster read queries. 
