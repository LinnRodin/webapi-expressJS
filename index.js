const port = process.env.PORT || 5000
const express = require ('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

//middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

//routes
const usersController = require('./controllers/usersController')
app.use('/api/users', usersController)

const formController = require('./controllers/formController')
app.use('/api/form', formController)

const productsController = require('./controllers/productsController')
app.use('/api/products', productsController)

// initialize
app.listen(port, () => console.log(`WebApi is running on http://localhost:${port}`))