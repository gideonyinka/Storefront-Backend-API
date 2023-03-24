# Database Schema

## Users Database
CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR(255), last_name VARCHAR(255), password_digest VARCHAR(255));
## Products Database
CREATE TABLE products (id SERIAL PRIMARY KEY, product_name VARCHAR(255), price integer);
## Orders Database
CREATE TABLE orders (id SERIAL PRIMARY KEY, product_id bigint REFERENCES products(id), quantity integer, user_id bigint REFERENCES users(id), status VARCHAR(255));
## Orders_Products
CREATE TABLE order_products(id SERIAL PRIMARY KEY, product_id bigint REFERENCES products(id), order_id bigint REFERENCES orders(id), quantity integer);

# Information about the API Endponts 

## Users Routes
### Index 
- http verb: GET
- Route: http://localhost:3000/user
- Provide the token generated in the create routes to the BODY as JSON: For Example;

  {
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiU2V1biIsImxhc3RfbmFtZSI6Ik9rdW5vbGEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkWkNPaEhkeTU1WW8yaGlNcDZQSm9KdVBjVGduVmcya3hFRi9TZkVpajYyT092akkwd0JJbUMifSwicGFzc3dvcmRfZGlnZXN0Ijp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiU2V1biIsImxhc3RfbmFtZSI6Ik9rdW5vbGEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkWkNPaEhkeTU1WW8yaGlNcDZQSm9KdVBjVGduVmcya3hFRi9TZkVpajYyT092akkwd0JJbUMifSwiaWF0IjoxNjc4MTkwMjU3fQ.toPJXLpEJQ2GC8I9vf54LhAR76hGiDNrc5vkls3Z-Po"
}

### Show 
- http verb: GET
- Route: http://localhost:3000/user/id
- Provide the token generated in the create routes to the BODY as JSON: For Example;
  {
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiU2V1biIsImxhc3RfbmFtZSI6Ik9rdW5vbGEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkWkNPaEhkeTU1WW8yaGlNcDZQSm9KdVBjVGduVmcya3hFRi9TZkVpajYyT092akkwd0JJbUMifSwicGFzc3dvcmRfZGlnZXN0Ijp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiU2V1biIsImxhc3RfbmFtZSI6Ik9rdW5vbGEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkWkNPaEhkeTU1WW8yaGlNcDZQSm9KdVBjVGduVmcya3hFRi9TZkVpajYyT092akkwd0JJbUMifSwiaWF0IjoxNjc4MTkwMjU3fQ.toPJXLpEJQ2GC8I9vf54LhAR76hGiDNrc5vkls3Z-Po"
}

### Create 
- http verb: POST
- Route: http://localhost:3000/user
- Provide the details of the user in the BODY as JSON: For Example;

{
    "firstName":"Yinka",
    "lastName": "Okunola",
    "password": "password12"
}

## Products Routes
### Index 
- http verb: GET
- Route: http://localhost:3000/products

### Show
- http verb: GET
- Route: http://localhost:3000/products/id

### Create 
- http verb: POST
- Route: http://localhost:3000/products
- Provide the token generated in the create routes to the BODY as JSON together with product details: For Example;
  {
    "productName": "paracetamol syrup",
    "price": 400,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiU2V1biIsImxhc3RfbmFtZSI6Ik9rdW5vbGEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkWkNPaEhkeTU1WW8yaGlNcDZQSm9KdVBjVGduVmcya3hFRi9TZkVpajYyT092akkwd0JJbUMifSwicGFzc3dvcmRfZGlnZXN0Ijp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiU2V1biIsImxhc3RfbmFtZSI6Ik9rdW5vbGEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkWkNPaEhkeTU1WW8yaGlNcDZQSm9KdVBjVGduVmcya3hFRi9TZkVpajYyT092akkwd0JJbUMifSwiaWF0IjoxNjc4MTkwMjU3fQ.toPJXLpEJQ2GC8I9vf54LhAR76hGiDNrc5vkls3Z-Po"
}

## Orders Routes
### Index 
- http verb: GET
- Route: http://localhost:3000/orders

### Show
- http verb: GET
- Route: http://localhost:3000/orders/id

### Create
- http verb: POST
- Route: http://localhost:3000/orders
- Provide the details of the orders: For Example;

{
    "user_id": 1,
    "status": "complete or active"
}

### Add Products Route
- http verb: POST
- Route: http://localhost:3000/orders/id/products
- Provide the token generated in the create routes to the BODY as JSON together with product details: For Example;
  {
    "product_id": "paracetamol syrup",
    "quantity": 5,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiU2V1biIsImxhc3RfbmFtZSI6Ik9rdW5vbGEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkWkNPaEhkeTU1WW8yaGlNcDZQSm9KdVBjVGduVmcya3hFRi9TZkVpajYyT092akkwd0JJbUMifSwicGFzc3dvcmRfZGlnZXN0Ijp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiU2V1biIsImxhc3RfbmFtZSI6Ik9rdW5vbGEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkWkNPaEhkeTU1WW8yaGlNcDZQSm9KdVBjVGduVmcya3hFRi9TZkVpajYyT092akkwd0JJbUMifSwiaWF0IjoxNjc4MTkwMjU3fQ.toPJXLpEJQ2GC8I9vf54LhAR76hGiDNrc5vkls3Z-Po"
}


