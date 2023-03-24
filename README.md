# Storefront-Backend-API
Developing storefront backend API

### Instructions for database setup in psql;

** Create store_front database**

```psql -U postgres
password: password123
CREATE USER stack_user WITH PASSWORD "password123";
CREATE DATABASE store_front;
\c store_front
GRANT USAGE, CREATE ON SCHEMA public TO stack_user;```

** Create store_front_test database**

```psql -U postgres
password: password123
CREATE USER stack_user WITH PASSWORD "password123";
CREATE DATABASE store_front;
\c store_front
GRANT USAGE, CREATE ON SCHEMA public TO stack_user;```

### Default Backend port is "3000"
### Default Database port is "5432"



### Instructions to access create, show, index users and products including adding orders to order_product table

## To create User account:Kindly provide the user(s) details which include firstname, lastname, and password

For example:
{
    "firstName":"Yinka",
    "lastName": "Okunola",
    "password": "password12"
}

## To access show or index functionality in the user account, kindly provide the token generated during user account creation

## The same token must be provided to create new products, and create orders by user


## scripts to build, test and start my application

"scripts": {
    "prettier": "prettier --config .prettierrc --write src/**/*.ts ",
    "lint": "eslint  'src/**/*.ts'  ",
    "build": "npx tsc",
    "jasmine": "jasmine",
    "migrate": "db-migrate --env test up && db-migrate up",
    "test": "ENV=test && npx tsc && db-migrate --env test up && jasmine && db-migrate db:drop test",
    "start": "nodemon src/index.ts"
  }

  //cors for cross platform application and support
  //testing endpoints for response status
  //testing the models(users, products, orders) to evaluate expectation to be true

## My environment variables file contains the following information
POST_HOST = 127.0.0.1
POSTGRES_DB = store_front
POSTGRES_TEST_DB = store_front_test
POSTGRES_USER = stack_user 
POSTGRES_PASSWORD = password123
ENV = dev
BCRYPT_PASSWORD = speak-friend-and-enter
SALT_ROUNDS = 10
TOKEN_SECRET = glorytogod12
