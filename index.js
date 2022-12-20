require('dotenv').config()
const port = process.env.WEBAPI_PORT || 1987
const initMongoDB = require ('./mongodb-server')
const express = require ('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')


//middleware
app.use(cors())
app.use(express.urlencoded({ extended: true })) //is a method inbuilt in express to recognize the incoming Request, can parse incoming Request Object if object, with nested objects, or any type.
app.use(bodyParser.json()) //specifically for POST Requests

//routes

initMongoDB()
// const usersController = require('./controllers/usersController')
// app.use('/api/users', usersController)

//  const formController = require('./controllers/formController')
//  app.use('/api/form', formController)

const productsController = require('./controllers/productController')
app.use('/api/products', productsController)

// initialize
app.listen(port, () => console.log(`WebApi is running on http://localhost:${port}`))

