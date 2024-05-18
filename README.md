# GraphQL + NodeJS Back-End

This project is meant to be run with react-frontend as the Front-End application.

This application uses an instance of MongoDB as database, this database doesn't run locally but on a cloud. See: https://cloud.mongodb.com/

Example of .env file

```
NODE_ENV = 'development'
PORT = 4000
MONGO_URI = 'mongodb+srv://{DB Connection String}'
JWT_PRIVATE_KEY = 'Very Private Key'
JWT_EXPIRY_TIME = '2h'
```
